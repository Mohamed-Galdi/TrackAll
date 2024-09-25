<script setup></script>

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
          stroke-dashoffset="calc(251.2 - (251.2 * 60) / 100)"
        ></circle>
      </svg>
    </div>

    <!-- Center Text -->
    <div class="absolute text-center">
      <p class="text-slate-800 text-sm">tasks:</p>
      <p class="text-indigo-600 text-xl font-bold">3/5</p> <!-- Adjust text styling as needed -->
    </div>
  </div>
</template>


<style scoped></style>
