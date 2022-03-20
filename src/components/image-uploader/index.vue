<script setup lang="ts">
import { defineProps } from "vue";
import { baseUrl } from "@/service";
import { ref, defineEmits } from "vue";

const props = defineProps<{
  value: string[]
}>();
const uploadUrl = ref(`${baseUrl}/common/upload`);
const uploadedBanners = ref();
uploadedBanners.value = props.value.map(item => ({
  status: 'success',
  url: item,
  type: 'image'
}));

const emit = defineEmits(['update:value']);
const banners = ref<string[]>(props.value || []);
const bannersLen = ref(banners.value.length);
emit('update:value', banners.value);

const uploadImages = ref<any[]>([])
const onStart = o => {
  console.log(o.taroFilePath);
  uploadImages.value.push(o.taroFilePath);
}

const onUploadSuccess = ({ data, fileItem }) => {
  const res = JSON.parse(data.data);
  const index = uploadImages.value.findIndex(item => item === fileItem.path);
  console.log(fileItem.path);
  console.log({ index });
  banners.value[bannersLen.value + index] = res.data;
  uploadImages.value[index] = null;
  if (uploadImages.value.every(item => !item)) {
    uploadImages.value = [];
    bannersLen.value = banners.value.length;
    console.log(banners.value);
    emit('update:value', banners.value);
  }
}

const onDelete = ({ index }) => {
  banners.value.splice(index, 1);
  bannersLen.value--;
  emit('update:value', banners.value);
}
</script>

<template>
  <nut-uploader 
    ref="uploader"
    :url="uploadUrl" 
    @start="onStart"
    @success="onUploadSuccess"
    @delete="onDelete"
    v-model:file-list="uploadedBanners" />
</template>