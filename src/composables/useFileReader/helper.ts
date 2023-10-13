import { fileReaderOptions } from "."

/**
 * Read file
 *
 * 读取文件
 *
 * @param file
 * @param options
 * @returns
 */
export async function readFile<T>(file: File, options: fileReaderOptions<T> = {}) {
  if (!file) return null
  const { onProgress, onError, load } = options
  const reader = new FileReader()
  return new Promise<T | null>((resolve) => {
    reader.onload = (e) => {
      if (!e.target) return null
      load
        ?
        load(e.target.result as string, resolve)
        :
        resolve(e.target.result as T)
    }

    reader.onprogress = onProgress ?? null
    reader.onerror = onError ?? null

    reader.readAsBinaryString(file)
  })
}