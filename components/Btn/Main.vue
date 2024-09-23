<script setup>
const props = defineProps({
    link: String,
})

</script>
<template>
    <NuxtLink :to="link" class="bg-indigo-500 hover:bg-indigo-700 border-2 border-indigo-600 text-white py-2 px-4 rounded-xl text-center transition-all duration-300 ease-in-out">
        <slot></slot>
    </NuxtLink>
</template>


<style scoped></style>