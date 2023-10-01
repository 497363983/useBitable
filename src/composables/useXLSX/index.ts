import { MaybeRefOrGetter, ref, watch, toValue, onMounted } from "vue"
import { readXLSX } from "./helper"
import { WorkBook } from "xlsx"

/**
 * Options of useXLSX
 */
interface useXLSXOptions {
  /**
   * Transform the ```WorkBook``` to the type you want
   *
   * 将 ```WorkBook``` 转换为需要的类型
   *
   * @param wb
   * @returns
   */
  transform?: (wb: WorkBook | undefined) => unknown,

  /**
   * Progress event handler
   *
   * 进度事件处理程序
   *
   * @param ev
   * @returns
   */
  onProgress?: (ev: ProgressEvent<FileReader>) => void

  /**
   * Error event handler
   *
   * 错误事件处理程序
   *
   * @param ev
   * @returns
   */
  onError?: (ev: ProgressEvent<FileReader>) => void
}

/**
 * Reactive xlsx/xls file
 *
 * 响应式的xlsx/xls文件
 *
 * @param file
 * @param options
 * @returns
 */
export function useXLSX(file: MaybeRefOrGetter<File>, options: useXLSXOptions = {}) {
  const pending = ref(false)
  const wb = ref<WorkBook>()
  const name = ref<string>("")
  const table = ref()
  const { transform } = options
  watch(
    () => toValue(file),
    async (f) => {
      pending.value = true
      wb.value = await readXLSX(f)
      name.value = f.name
      table.value = transform ? transform(toValue(wb)) : toValue(wb)
      pending.value = false
    },
    { deep: true }
  )
  onMounted(() => {
    pending.value = true
    const f = toValue(file)
    name.value = f.name
    readXLSX(f).then((w) => {
      wb.value = w
      table.value = transform ? transform(w) : w
      pending.value = false
    })
  })
  return {
    pending,
    wb,
    name,
    table,
  }
}