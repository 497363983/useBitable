# useFileReader

## 用法

该组合式函数是对 [`FileReader`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) API 的封装，用于读取文件内容。只需传入一个 `File` 对象，即可获取到文件内容。当然，假如传入的是一个 `Ref<File>` 或是一个 Getter (`()=>File`), 读取的文件内容也会随传入值的变化而自动更新，提供一个响应式的 `FileReader`。

```vue
<script setup lang="ts">
import { useFileReader } from "@qww0302/use-bitable"
import { ref } from "vue"

const file = ref<File>()

/**
 * data: 文件内容，由 `options.load` 将 BinaryString 转换得到
 * pending: 加载状态
 * name: 文件名
 */
const { data, pending, name } = useFileReader(file, {
  load: (data, resolve) => {
    // 将 `BinaryString` 转换为其他类型
  },
  onError: (e) => {
    // 处理错误
  },
  onProgress: (e) => {
    // 处理进度
  },
})
</script>
```
