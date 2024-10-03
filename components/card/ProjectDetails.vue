<script setup>
const { techComponents } = useTechComponents();

const props = defineProps({
  project: Object,
});
</script>

<template>
  <div class="bg-white p-6 rounded-lg border border-gray-300 shadow-sm overflow-x-scroll">
    <div class="flex md:flex-row flex-col justify-start md:items-center gap-4">

      <!-- Logo and Name -->
      <div class="w-1/2 flex justify-start items-center gap-4">
        <!-- Project Logo -->
        <div
          class="max-w-24 min-w-24 min-h-24 max-h-24  w-1/6 bg-slate-200 rounded-md border border-white flex justify-center items-center shadow-lg"
        >
          <img
            :src="props.project.logo"
            alt="Logo"
            class="w-[5.5rem] h-[5.5rem] rounded-sm object-cover bg-white"
          />
        </div>
        
        <!-- Name and Status -->
        <div class="">
          <!-- Project Name -->
          <h2
            class="font-bold sm:text-2xl text-lg font-amulya text-slate-700 line-clamp-1 uppercase"
          >
            {{ useTextLimit(props.project.name, 20) }}
          </h2>
          <!-- Project Status -->
          <CardStatus :type="props.project.status" />
        </div>
      </div>

      <!-- Stack and Tasks -->
      <div class="md:w-1/2 w-full flex flex-col j">
        <!-- Tech Stack -->
        <div
          class="grid md:grid-cols-8 grid-cols-4 gap-2 justify-start items-center mt-2 px-2 py-1 bg-gray-100 border border-slate-300 rounded-lg"
        >
          <component
            v-for="tech in props.project.tech_stack"
            :key="tech"
            :is="techComponents[tech]"
          />
        </div>

        <!-- Tasks -->
        <div
          class="grid grid-cols-3 gap-2 justify-start items-center mt-4 px-2 py-2 bg-gray-100 border border-slate-300 rounded-lg"
        >
          <div class="flex items-center gap-2 text-gray-700 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p
              >Total:
              <span class="font-semibold">{{
                props.project.totalTasks
              }}</span></p
            >
          </div>
          <div class="flex items-center gap-2 text-blue-600 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p class="w-full"
              >Open:
              <span class="font-semibold">{{
                props.project.openTasks
              }}</span></p
            >
          </div>
          <div class="flex items-center gap-2 text-green-600 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p  class="w-full"
              >Closed:
              <span class="font-semibold">{{
                props.project.closedTasks
              }}</span></p
            >
          </div>
        </div>
      </div>

    </div>


    <div class="w-full flex justify-between gap-6 mt-4">
      <!-- Project Dates -->
      <div class="md:w-1/2 flex gap-4">
        <div class="rounded-lg">
          <p class="text-sm text-slate-400">created:</p>
          <p class="text-sm font-semibold text-slate-700">
            {{ useFormattedDate(props.project.created_at) }} ({{
              useHumanReadableDate(props.project.created_at)
            }})
          </p>
        </div>
        <div class="rounded-lg">
          <p class="text-sm text-slate-400">Updated:</p>
          <p class="text-sm font-semibold text-slate-700">
            {{ useFormattedDate(props.project.updated_at) }} ({{
              useHumanReadableDate(props.project.updated_at)
            }})
          </p>
        </div>
      </div>
      
    </div>
    <!-- Project Description -->
    <div class="mt-6">
      <Fieldset>
        <template #legend>
          <p class="font-bold text-slate-500">Project Description</p>
        </template>
        <p class="text-slate-600 mt-2">
          {{ props.project.description || "No description provided !" }}
        </p>
      </Fieldset>
    </div>
  </div>
</template>

<style scoped></style>
