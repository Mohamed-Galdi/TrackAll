<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const props = defineProps({
  project: Object,
});

// Extend dayjs with the relativeTime plugin
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

const { techComponents } = useTechComponents();

const router = useRouter();

function goToProjectDetails() {
  router.push(`/projects/${props.project.id}`);
}
</script>

<template>
  <div @click="goToProjectDetails"
    class="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-md h-82 cursor-pointer hover:shadow-sm hover:scale-[0.99] transition-all duration-300 ease-in-out"
  >
    <div class="flex justify-start items-center gap-4">
      <!-- Project Icon -->
      <div
        class="min-w-16 h-16 bg-slate-300 rounded-md border border-white flex justify-center items-center"
      >
      <img v-if="project.logo" :src="project.logo" alt="Logo" class="w-14 h-14 rounded-sm object-cover bg-white">
    </div>
      <div class="w-full">
        <!-- Project Name -->
        <h2 class="font-bold text-xl font-amulya text-slate-700 line-clamp-1">
          {{ project.name }}
        </h2>
        <!-- Project Status -->
        <CardStatus :type="project.status" />
      </div>
    </div>

    <div class="flex justify-between items-center gap-4 mt-4 pe-4">
      <!-- Project Dates -->
      <div class="w-2/3 flex flex-col justify-start gap-1">
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

      <!-- Project Progress -->
      <div class="w-1/3 grid place-items-center">
        <CardProgress :total-tasks="0" :completed-tasks="0" class="w-full" />
      </div>
    </div>
    <div>
      <!-- Project Tech Stack -->
      <div
        class="grid grid-cols-8 gap-2 justify-start items-center mt-2 px-2 py-1 bg-gray-100 border border-slate-300 rounded-lg"
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
