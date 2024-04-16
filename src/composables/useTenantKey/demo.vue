<script setup lang="ts">
import { useTenantKey } from "@qww0302/use-bitable"
const tenantId = useTenantKey()
</script>

<template>
  <p>TenantKey: {{ tenantId ?? "null" }}</p>
</template>