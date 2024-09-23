<script setup>
// props
const props = defineProps({
  image: String,
});
</script>

<template>
  <div>
    <img
      :src="image"
      class="w-full h-full object-cover"
    />
  </div>
</template>
