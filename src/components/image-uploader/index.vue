<script setup lang="ts">
import { baseUrl } from "@/service";
import { ref, defineEmits } from "vue";

const uploadUrl = ref(`${baseUrl}/common/upload`);
const banners = ref<string[]>([]);
const emit = defineEmits(['update:value']);

const onUploadSuccess = ({ data }) => {
  const res = JSON.parse(data.data);
  banners.value.push(res.data);
  emit('update:value', banners.value);
}

const onDelete = ({ index }) => {
  banners.value.splice(index, 1);
  emit('update:value', banners.value);
}
</script>

<template>
  <nut-uploader 
    :url="uploadUrl" 
    @success="onUploadSuccess"
    @delete="onDelete" />
</template>
