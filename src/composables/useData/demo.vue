<script setup lang="ts">
import { useData } from "@qww0302/use-bitable"
import { ref } from "vue"

const { data } = useData()
const i = ref("test")
// const data = ref()

const click = () => {
  data.value = i.value

}

</script>

<template>
  <div>
    <input v-model="i">
    <button @click="click">
      click
    </button>
    <p>{{ data }}</p>
  </div>
</template>