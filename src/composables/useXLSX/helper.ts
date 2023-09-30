import { read, WorkBook } from "xlsx"

type readXLSXReturn = WorkBook | undefined

export function readXLSX(file: File): Promise<readXLSXReturn>
// export function readXLSX(file: string): Promise<readXLSXReturn>

/**
 * Read xlsx/xls file
 * @param file File
 * @returns
 */
export async function readXLSX(file: File) {

  if (!file) {
    return
  }

  const reader = new FileReader()
  const data = await new Promise<ArrayBuffer>((resolve) => {
    reader.onload = (e) => {
      if (!e.target) {
        return
      }
      resolve(e.target.result as ArrayBuffer)
    }
    reader.readAsArrayBuffer(file)
  })
  const workbook = read(data, { type: "array" })
  return workbook
}