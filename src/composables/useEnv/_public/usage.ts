import { useEnv } from "@qww0302/use-bitable"
import { computed } from "vue"

const env = useEnv()
const isBitable = computed(() => !!env.value)