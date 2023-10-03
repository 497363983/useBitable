/**
 * FileReader options
 */
export interface fileReaderOptions {

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

  /**
   * Load event handler
   *
   * 加载事件处理程序
   *
   * @param data
   * @param resolve
   * @returns
   */
  load?: (data: string | ArrayBuffer | null, resolve: (value: unknown) => void) => void
}

/**
 * Read file
 *
 * 读取文件
 *
 * @param file
 * @param options
 * @returns
 */
export async function readFile(file: File, options: fileReaderOptions = {}) {
  if (!file) return
  const { onProgress, onError, load } = options
  const reader = new FileReader()
  return new Promise((resolve) => {
    reader.onload = (e) => {
      if (!e.target) return
      load ? load(e.target.result, resolve) : resolve(e.target.result)
    }

    reader.onprogress = onProgress ?? null
    reader.onerror = onError ?? null

    reader.readAsBinaryString(file)
  })
}