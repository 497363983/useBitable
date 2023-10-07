# useFileReader

## Usage

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
