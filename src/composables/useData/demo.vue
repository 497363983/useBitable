<script setup lang="ts">
// import { useData } from "@qww0302/use-bitable"
import { bitable } from "@lark-base-open/js-sdk"
import { ref, toRaw } from "vue"

// const { data } = useData()
const i = ref("test")
const data = ref()

const click = () => {
  bitable.bridge.setData({ "test": "kkk" }).then(() => {
    bitable.bridge.getData().then((res) => {
      console.log(res, toRaw(i.value))
      data.value = res
    })
  }).catch((err) => {
    console.log(err)
  })

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