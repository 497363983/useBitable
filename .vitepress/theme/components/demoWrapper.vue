<script setup lang="ts">
import { onErrorCaptured, ref, defineAsyncComponent } from "vue"

defineProps<{
  src: string;
}>();

const error = ref<Error | null>(null);


onErrorCaptured((err) => {
  error.value = err;
});

// @ts-ignore
const envNotice = defineAsyncComponent(() => import("./envNotice.vue"));
</script>

<template>
  <ClientOnly>
    <Suspense>
      <envNotice />
    </Suspense>
  </ClientOnly>
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

<style></style>
