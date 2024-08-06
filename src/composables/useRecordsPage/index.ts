import { ref, toValue, shallowRef, watch, computed, MaybeRef } from "vue";
import type { MaybeRefOrGetter } from "vue";
import type { ITable, IFilterInfo, ISortInfo, IRecord } from "@lark-base-open/js-sdk";

/**
 * Page option
 */
interface RecordsPageOption {
  /**
   * Per page size
   *
   * 每页大小
   *
   * @default 200
   */
  pageSize: number
  /**
   * Filter
   *
   * 过滤条件
   */
  filter?: IFilterInfo
  /**
   * Sorts
   *
   * 排序
   */
  sort?: ISortInfo[]
  /**
   * View ID
   *
   * 视图 ID
   */
  viewId?: MaybeRef<string | null>
  /**
   * Whether to get shallow records
   *
   * @default false
   */
  shallow?: boolean
}

function getPageRecords(
  table: ITable,
  pageSize: number,
  filter?: IFilterInfo,
  sort?: ISortInfo[],
  viewId?: string,
  pageToken?: number
) {
  return table.getRecordsByPage({
    pageSize,
    filter,
    sort,
    viewId,
    pageToken,
  })
}
/**
 * Reactive Records Page
 *
 * 响应式记录分页
 *
 * @param table
 * @param option
 * @returns
 */
export function useRecordsPage(
  table: MaybeRefOrGetter<ITable | null>,
  option?: RecordsPageOption
) {
  const {
    pageSize = 200,
    filter,
    sort,
    viewId,
    shallow = false,
  } = option || {}
  const pending = ref<boolean>(false)
  const total = ref<number>(0)
  const totalPage = computed(() => Math.ceil(total.value / pageSize))
  const pageToken = ref<number>()
  const curPage = computed({
    get() {
      if (pageToken.value === (void 0)) return 0
      const i = pageToken.value / pageSize
      if (i <= 0) return 0
      if (i >= totalPage.value) return totalPage.value - 1
      return i
    },
    set(v) {
      if (v >= totalPage.value) return pageToken.value = total.value - pageSize
      if (v <= 0) return pageToken.value = void 0
      pageToken.value = v * pageSize
    }
  })
  const hasMore = ref<boolean>(true)
  const records = shallow ? shallowRef<IRecord[]>([]) : ref<IRecord[]>([])

  const getPage = async () => {
    if (!hasMore.value) return
    const tableItem = toValue(table)
    if (!tableItem) throw new Error("useBitable[useRecordsPage]: Table is not ready")
    pending.value = true
    const page = await getPageRecords(
      tableItem,
      pageSize,
      filter,
      sort,
      toValue(viewId) || void 0,
      pageToken.value
    )
    pending.value = false
    return page
  }

  watch(
    [
      () => toValue(table),
      curPage,
      () => toValue(viewId),
    ],
    async () => {
      const page = await getPage()
      if (!page) return
      const { records: newRecords, total: totalNum, hasMore: canNext } = page
      total.value = totalNum
      hasMore.value = canNext
      records.value = newRecords
    }
  )

  return {
    /**
     * Total number of records
     */
    total,
    records,
    totalPage,
    /**
     * Current page number, starting from 0
     */
    curPage,
    pending,
    hasMore,
  }
}