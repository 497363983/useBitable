<script setup lang="ts">
import { useEnv } from "@qww0302/use-bitable"
const env = useEnv()
</script>

<template>
  <p>Environment: {{ env ?? "null" }}</p>
</template>