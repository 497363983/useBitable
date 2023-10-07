<script setup lang="ts">
import { usePersonalBaseToken } from "@qww0302/use-bitable"

const token = usePersonalBaseToken()
</script>

<template>
  <p>Token: {{ token }}</p>
</template>