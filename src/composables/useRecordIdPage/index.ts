import { toValue, watch, MaybeRef } from "vue";
import { useTablePage } from "@/shared";
import type { MaybeRefOrGetter } from "vue";
import type { ITable, ISortInfo, IFilterInfo } from "@lark-base-open/js-sdk";

/**
 * RecordId Page option
 */
interface RecordIdPageOption {
  /**
   * Per page size
   *
   * 每页大小
   *
   * @default 200
   */
  pageSize?: number
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
}

export function useRecordIdPage(
  table: MaybeRefOrGetter<ITable | null>,
  option: RecordIdPageOption
) {
  const {
    pageSize = 200,
    filter,
    sort,
    viewId,
  } = option || {}
  const {
    total,
    hasMore,
    items,
    pending,
    curPage,
    totalPage,
    getPage,
  } = useTablePage(
    table,
    async (table, pageToken) => {
      const {
        total,
        recordIds,
        hasMore,
      } = await table.getRecordIdListByPage({
        pageSize,
        pageToken,
        filter,
        sort,
        viewId: toValue(viewId) || void 0,
      })
      return {
        total,
        hasMore,
        items: recordIds,
      }
    },
    {
      pageSize
    }
  )

  watch(
    () => toValue(viewId),
    async () => {
      const page = await getPage()
      if (!page) return
      total.value = page.total
      hasMore.value = page.hasMore
      items.value = page.items
    }
  )


  return {
    total,
    hasMore,
    recordIds: items,
    pending,
    curPage,
    totalPage,
  }
}