import { read, WorkBook } from "xlsx"

type readXLSXReturn = WorkBook | undefined

export function readXLSX(file: File): Promise<readXLSXReturn>
// export function readXLSX(file: string): Promise<readXLSXReturn>

/**
 * Read xlsx/xls file
 *
 * 读取 xlsx/xls 文件
 *
 * @param file File
 * @returns
 */
export async function readXLSX(file: File) {

  if (!file) return
  if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) return

  const reader = new FileReader()
  return new Promise<WorkBook>((resolve) => {
    reader.onload = (e) => {
      if (!e.target) return
      const data = e.target.result
      const wb = read(data, { type: "binary" })
      resolve(wb)
    }

    reader.onprogress = (ev: ProgressEvent<FileReader>) => {
      console.log(ev.loaded)
    }
    reader.readAsBinaryString(file)
  })
}