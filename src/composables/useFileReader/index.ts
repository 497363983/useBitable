import { MaybeRefOrGetter, ref, watch, toValue } from 'vue'
import { readFile, fileReaderOptions } from './helper'

/**
 * Options of useFileReader
 */
export interface useFileReaderOptions extends fileReaderOptions {
  // transform?: (data: string | ArrayBuffer | null) => unknown
}

export function useFileReader(file: MaybeRefOrGetter<File>, options: useFileReaderOptions = {}) {
  const data = ref()
  const pending = ref(false)
  const name = ref("")
  const { ...fileReaderOptions } = options
  function loadData(f: File) {
    pending.value = true
    readFile(f, fileReaderOptions).then((d) => {
      data.value = d
      name.value = f.name
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

  // onMounted(()=>{
  //   pending.value = true
  //   readFile(toValue(file), fileReaderOptions).then((d)=>{
  //     data.value = d
  //     pending.value = false
  //   })
  // })
}