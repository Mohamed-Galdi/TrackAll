<script setup>
import Skeleton from "primevue/skeleton";
</script>

<template>
  <div
    class="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-md h-82 cursor-pointer hover:shadow-sm hover:scale-[0.99] transition-all duration-300 ease-in-out"
  >
    <div class="flex justify-start items-center gap-4">
      <!-- Project Icon -->
      <Skeleton height="4rem" width="5.5rem" />
      <div class="w-full space-y-2">
        <!-- Project Name -->
        <Skeleton width="10rem" />
        <!-- Project Status -->
        <Skeleton width="4rem" />
      </div>
    </div>

    <div class="flex justify-between items-center gap-4 mt-4 pe-4">
      <!-- Project Dates -->
      <div class="w-2/3 flex flex-col justify-start gap-4">
        <Skeleton width="10rem" />
        <Skeleton width="10rem" />
      </div>

      <!-- Project Progress -->
      <div class="w-1/3 grid place-items-center">
        <Skeleton width="6rem" height="6rem" shape="circle" />
      </div>
    </div>
    <div class="mt-4">
      <!-- Project Tech Stack -->
      <Skeleton width="22rem" height="2rem" />
    </div>
  </div>
</template>

<style scoped></style>
