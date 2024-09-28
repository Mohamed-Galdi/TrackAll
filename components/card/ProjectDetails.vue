<script setup>
const props = defineProps({
    project: Object,
});
</script>


<template>
    <div>
       <div>
        <img :src=" props.project.logo" alt="Logo" class="w-14 h-14 rounded-sm object-cover bg-white">
       </div>
       <div class="w-full">
        <h2 class="font-bold text-xl font-amulya text-slate-700 line-clamp-1">
          {{ props.project.name }}
        </h2>
        <p class="text-slate-400">
          {{ props.project.description }}
        </p>
        <p>{{ props.project.created_at }}</p>
        <p>{{ props.project.updated_at }}</p>
        <p>{{ props.project.status }}</p>
        <p>{{ props.project.tech_stack }}</p>
       </div>
    </div>
</template>


<style scoped></style>