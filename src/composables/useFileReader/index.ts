import { MaybeRefOrGetter, ref, watch, toValue } from "vue"
import { readFile } from "./helper"


type BinaryString = string

/**
 * FileReader options
 */
export interface fileReaderOptions<T> {
  /**
   * Progress event handler
   *
   * 进度事件处理程序
   *
   * @param ev
   * @returns
   */
  onProgress?: (ev: ProgressEvent<FileReader>) => void;
  /**
   * Error event handler
   *
   * 错误事件处理程序
   *
   * @param ev
   * @returns
   */
  onError?: (ev: ProgressEvent<FileReader>) => void;
  /**
   * Load event handler
   *
   * 加载事件处理程序
   *
   * @param data
   * @param resolve
   * @returns
   */
  load?: (data: BinaryString, resolve: (value: T) => void) => void;
}

/**
 * Use `FileReader`
 *
 * 使用 `FileReader` API
 *
 * @see https://use-bitable.vercel.app/zh/references/composables/useFileReader/
 * @relation https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 * @param file
 * @param options
 * @returns
 */
export function useFileReader<T = string>(file: MaybeRefOrGetter<File | null>, options: fileReaderOptions<T> = {}) {
  const data = ref<T | null>()
  const pending = ref(false)
  const name = ref("")
  // const { ...fileReaderOptions } = options
  function loadData(f: File | null) {
    if (!f) {
      data.value = null
      name.value = ""
      pending.value = false
      return
    }
    pending.value = true
    readFile<T>(f, options).then((d) => {
      data.value = d
      name.value = f.name
      pending.value = false
    }).catch((e) => {
      console.error(e)
      pending.value = false
    })
  }
  watch(
    () => toValue(file),
    (f) => {
      loadData(f)
    },
    { immediate: true, deep: true },
  )
  return {
    data,
    pending,
    name,
  }
}