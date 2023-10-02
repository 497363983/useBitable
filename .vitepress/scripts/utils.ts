export function groupBy(arr: Array<any>, key: string) {
  const res = {}
  arr.forEach((item) => {
    const val = item[key]
    if (!res[val]) {
      res[val] = []
    }
    // res[val] = res[val] || []
    res[val].push(item)
  })
  return res
}