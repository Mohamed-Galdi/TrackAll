<script setup>
// props
const props = defineProps({
  direction: String,
  title: String,
  description: String,
  image: String,
  cta: String,
  link: String,
});
</script>

<template>
  <div
    class="flex justify-center items-center py-6 my-6 bg-cover bg-no-repeat bg-center"
    :class="direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'"
  >
    <div class="w-1/2 flex gap-4 justify-center items-start px-16">
      <div class="w-5/6 space-y-4 flex flex-col justify-center items-center">
        <!-- <IconsTasks class="w-16 h-16 text-indigo-500 mb-4 " /> -->
        <h2 class="text-5xl font-bold font-synonym text-indigo-500 text-center">
          {{ title }}
        </h2>
        <p class="text-justify font-thin font-amulya">{{ description }}</p>
        <button
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl w-full"
        >
          {{ cta }}
        </button>
      </div>
    </div>
    <div class="w-1/2 flex justify-center items-center">
      <div class="bg-gray-900 w-[34rem] h-[28rem] rounded-xl relative">
        <div
          class="absolute -top-2 -left-2 w-full h-full bg-gray-200 rounded-xl border-2 border-gray-900 flex flex-col items-start overflow-hidden"
        >
          <div
            class="bg-gray-300 w-full h-6 flex justify-start items-center px-2 gap-1"
          >
            <div class="w-3 h-3 bg-red-400 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div class="w-3 h-3 bg-green-600 rounded-full"></div>
          </div>
          <img
            src="~/assets/showcase/github.gif"
            
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
