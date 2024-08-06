<script setup lang="ts">
import { ElInput, ElButton } from "element-plus";
import { ref, onMounted } from "vue";
import { onDataChange } from "@qww0302/use-bitable";
import { bitable } from "@lark-base-open/js-sdk";

const value = ref("");
const data = ref<string>();
const key = ref("test");
const changed = ref<string[]>([]);

onDataChange((ev) => {
  changed.value = ev.keys;
  bitable.bridge.getData<string>(key.value).then((res) => {
    data.value = res;
  });
});

const set = () => {
  bitable.bridge.setData(key.value, value.value);
};

onMounted(() => {
  bitable.bridge.getData<string>(key.value).then((res) => {
    data.value = res;
  });
});

</script>

<template>
  <div>
    Data key:
    <ElInput v-model="key" placeholder="Input key to set data"></ElInput>
  </div>
  <div>
    Data value:
    <ElInput v-model="value" placeholder="Input value to set data"></ElInput>
  </div>
  <ElButton @click="set" type="primary">Click to set data</ElButton>
  <div>
    Changed key: {{ changed }}
  </div>
  <div style="margin-top: 20px;">
    Data: {{ data }}
  </div>
</template>
