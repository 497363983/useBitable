import { ref, computed, toValue, watch } from "vue"
import type { MaybeRefOrGetter } from "vue"
import type { ITable } from "@lark-base-open/js-sdk"

interface TablePageOption {
  /**
   * Per page size
   *
   * @default 200
   */
  pageSize: number
}

interface Page<T> {
  total: number
  hasMore: boolean
  pageToken?: number
  items: T[]
}

export function useTablePage<R>(
  table: MaybeRefOrGetter<ITable | null>,
  pageGetter: (table: ITable, pageToken?: number) => Promise<Page<R>>,
  option?: TablePageOption
) {
  const { pageSize = 200 } = option || {}
  const items = ref<R[]>([])
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

  const getPage = async () => {
    const tableItem = toValue(table)
    if (!tableItem) return
    pending.value = true
    try {
      const page = await pageGetter(tableItem, pageToken.value)
      return page
    } finally {
      pending.value = false
    }
  }

  watch(
    [
      () => toValue(table),
      curPage
    ],
    async () => {
      const page = await getPage()
      if (!page) return
      total.value = page.total
      hasMore.value = page.hasMore
      items.value = page.items
    }
  )

  return {
    items,
    pending,
    total,
    totalPage,
    pageToken,
    curPage,
    hasMore,
    getPage
  }
}