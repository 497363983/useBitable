<script setup lang="ts">
import { useUserId } from "@qww0302/use-bitable"
const userId = useUserId()
</script>

<template>
  <p>UserId: {{ userId ?? "null" }}</p>
</template>