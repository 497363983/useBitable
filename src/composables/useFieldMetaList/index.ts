import { ref, toValue, computed, watch } from "vue"
import { FieldType } from "@lark-base-open/js-sdk"
import { onFieldAdd, onFieldDelete, onFieldModify } from "@qww0302/use-bitable"
import type { MaybeRefOrGetter } from "vue"
import type { ITable, IFieldMeta } from "@lark-base-open/js-sdk"

interface FieldMetaListOption {
  /**
   * Field types
   */
  types?: FieldType[]
}

export function useFieldMetaList(
  table: MaybeRefOrGetter<ITable | null>,
  option?: FieldMetaListOption
) {
  const { types } = option || {}
  const fieldsMeta = ref<IFieldMeta[]>([])
  const pending = ref(false)
  const fieldMetaList = computed(() => toValue(fieldsMeta).map((i) => toValue(i)).filter((i) => !types || types.includes(i.type)))
  const refresh = async () => {
    const tableItem = toValue(table)
    if (!tableItem) return
    pending.value = true
    fieldsMeta.value = await tableItem.getFieldMetaList()
    pending.value = false
  }
  watch(() => toValue(table), refresh)
  onFieldAdd(table, refresh)
  onFieldDelete(table, refresh)
  onFieldModify(table, refresh)

  return {
    fieldMetaList,
    pending,
  }
}