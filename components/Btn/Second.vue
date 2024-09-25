<script setup>
const props = defineProps({
    link: String,
})

</script>
<template>
    <NuxtLink :to="link" class="bg-white hover:bg-slate-200 border text-center border-slate-400 text-slate-500 py-2 px-4 rounded-xl cursor-pointer  transition-all duration-300 ease-in-out">
        <slot></slot>
    </NuxtLink>
</template>


<style scoped></style>