<script setup lang="ts">
import { onErrorCaptured, ref } from "vue";

defineProps<{
  src: string;
}>();

const error = ref<Error | null>(null);

onErrorCaptured((err) => {
  error.value = err;
});
</script>

<template>
  <div class="demo">
    <p>
      <a class="demo-source-link" :href="src">Source</a>
    </p>
    <slot />
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<style>

</style>
