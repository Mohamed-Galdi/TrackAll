<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const { techComponents } = useTechComponents();

const props = defineProps({
  project: Object,
});

dayjs.extend(relativeTime);

const CreatedDate = computed(() => {
  return props.project.created_at
    ? dayjs(props.project.created_at).format("YYYY-MM-DD")
    : "";
});

const humanReadableCreatedDate = computed(() => {
  return props.project.created_at
    ? dayjs(props.project.created_at).fromNow()
    : "";
});

const UpdatedDate = computed(() => {
  return props.project.updated_at
    ? dayjs(props.project.updated_at).format("YYYY-MM-DD")
    : "";
});

const humanReadableUpdatedDate = computed(() => {
  return props.project.updated_at
    ? dayjs(props.project.updated_at).fromNow()
    : "";
});
</script>

<template>
  <div class="bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
    <div class="flex justify-start items-center gap-4">
      <!-- Project Logo -->
      <div
        class="min-w-24 min-h-24 bg-slate-200 rounded-md border border-white flex justify-center items-center shadow-lg"
      >
        <img
          :src="props.project.logo"
          alt="Logo"
          class="w-[5.5rem] h-[5.5rem] rounded-sm object-cover bg-white"
        />
      </div>
      <div class="w-1/2">
        <!-- Project Name -->
        <h2
          class="font-bold text-2xl font-amulya text-slate-700 line-clamp-1 uppercase"
        >
          {{ props.project.name }}
        </h2>
        <!-- Project Status -->
        <CardStatus :type="props.project.status" />
      </div>
      <div class="w-1/2">
        <div
          class="grid grid-cols-8 gap-2 justify-start items-center mt-2 px-2 py-1 bg-gray-100 border border-slate-300 rounded-lg"
        >
          <component
            v-for="tech in props.project.tech_stack"
            :key="tech"
            :is="techComponents[tech]"
          />
        </div>
      </div>
    </div>
    <!-- Project Dates -->
    <div class="w-full flex justify-start gap-6 mt-4">
      <div class="rounded-lg">
        <p class="text-sm text-slate-400">created:</p>
        <p class="text-sm font-semibold text-slate-700">
          {{ CreatedDate }} ({{ humanReadableCreatedDate }})
        </p>
      </div>
      <div class="rounded-lg">
        <p class="text-sm text-slate-400">Updated:</p>
        <p class="text-sm font-semibold text-slate-700">
          {{ UpdatedDate }} ({{ humanReadableUpdatedDate }})
        </p>
      </div>
    </div>
    <!-- Project Description -->
    <div class="mt-6">
      <Fieldset>
        <template #legend>
            <p class="font-bold text-slate-500">Project Description</p>
        </template>
        <p class="text-slate-600 mt-2">{{ props.project.description || 'No description provided !' }}</p>
      </Fieldset>
    </div>
  </div>
</template>

<style scoped></style>
