import {useTable} from "@qww0302/use-bitable"
import { ref } from "vue"

const tableId = ref<string | null>(null)

const { table, pending } = useTable(tableId)