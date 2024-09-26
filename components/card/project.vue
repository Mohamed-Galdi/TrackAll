<script setup>
import { defineAsyncComponent } from "vue";
const props = defineProps({
  project: Array,
});
const { techComponents } = useTechComponents();
</script>

<template>
  <div
    class="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-md h-82 cursor-pointer hover:shadow-sm hover:scale-[0.99] transition-all duration-300 ease-in-out"
  >
    <div class="flex justify-start items-center gap-4">
      <div
        class="min-w-16 h-16 bg-slate-300 rounded-md border border-white"
      ></div>
      <div class="w-full">
        <h2 class="font-bold text-xl font-amulya text-slate-700 line-clamp-1">
          {{ project.name }}
        </h2>
        <CardStatus :type="project.status" />
      </div>
      <div class="flex justify-end items-end h-full">
        <a href="{{ LiveLink }}" target="_blank">
          <IconsTarget class="w-5 h-5 text-blue-800" />
        </a>
      </div>
    </div>

    <div class="flex justify-between items-center gap-4 mt-4 pe-4">
      <div class="w-2/3 flex flex-col justify-start gap-1">
        <div class="rounded-lg">
          <p class="text-sm text-slate-400">created:</p>
          <p class="text-sm font-semibold text-slate-700">
            {{ project.created_at }} (2 days ago)
          </p>
        </div>
        <div class="rounded-lg">
          <p class="text-sm text-slate-400">Updated:</p>
          <p class="text-sm font-semibold text-slate-700">
            {{ project.updated_at }} (2 days ago)
          </p>
        </div>
      </div>

      <div class="w-1/3 grid place-items-center">
        <CardProgress :progress="40" class="w-full" />
      </div>
    </div>
    <div>
      <!-- <h3>Tech Stack:</h3> -->
      <div
        class="grid grid-cols-8 gap-2 justify-start items-center mt-2 px-2 py-1 bg-gray-200 border border-slate-50 rounded-lg"
      >
        <component
          v-for="tech in project.tech_stack"
          :key="tech"
          :is="techComponents[tech]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
