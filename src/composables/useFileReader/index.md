# useFileReader

## Usage

This composable function is a wrapper of [`FileReader`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) API, used to read the content of a file. Just pass in a `File` object, and you can get the content of the file. Of course, if the passed-in value is a `Ref<File>` or a Getter (`()=>File`), the read file content will also be automatically updated with the change of the passed-in value, providing a responsive `FileReader`.

```vue
<script setup lang="ts">
import { useFileReader } from "@qww0302/use-bitable"
import { ref } from "vue"

const file = ref<File>()

/**
 * data: file content, transformed from BinaryString by `options.load`
 * pending: loading status
 * name: file name
 */
 */
const { data, pending, name } = useFileReader(file, {
  load: (data, resolve) => {
    // transform `BinaryString` to other type
  },
  onError: (e) => {
    // handle error
  },
  onProgress: (e) => {
    // handle progress
  },
})
</script>
```
