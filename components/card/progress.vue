<script setup>
const props = defineProps({
  totalTasks: Number,
  completedTasks: Number,
});

// Compute the progress value based on the completed tasks and total tasks
const progress = computed(() => {
  if (props.totalTasks === 0) {
    return 0; // Avoid division by zero
  }
  return (props.completedTasks / props.totalTasks) * 100;
});


// Compute the stroke-dashoffset dynamically
const strokeDashOffset = computed(() => {
  const circleCircumference = 251.2; // Circumference of the circle
  if (props.totalTasks == 0) {
    return circleCircumference - (circleCircumference * 0) / 100;
  }
  return circleCircumference - (circleCircumference * progress.value) / 100;
});
</script>

<template>
  <div class="relative w-full h-full flex items-center justify-center">
    <!-- SVG Container -->
    <div class="relative -rotate-[90deg]">
      <svg class="w-full h-full" viewBox="0 0 100 100">
        <!-- Background circle -->
        <circle
          class="text-slate-200 stroke-current"
          stroke-width="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>

        <!-- Progress circle -->
        <circle
          class="text-indigo-400 progress-ring__circle stroke-current"
          stroke-width="10"
          stroke-linecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke-dasharray="251.2"
          :stroke-dashoffset="strokeDashOffset"
        ></circle>
      </svg>
    </div>

    <!-- Center Text -->
    <div class="absolute text-center">
      <p class="text-slate-800 text-sm">tasks:</p>
      <p class="text-indigo-600 text-xl font-bold">{{ completedTasks }}/{{ totalTasks }}</p>
    </div>
  </div>
</template>

<style scoped></style>
