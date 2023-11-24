import { useView } from "@qww0302/use-bitable"
import { ref } from "vue"

const tableId = ref<string | null>(null)
const viewId = ref<string | null>(null)

const { view, pending } = useView(tableId, viewId)