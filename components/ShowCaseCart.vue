<script setup>
// props
const props = defineProps({
  direction: String,
  title: String,
  description: String,
  video: String,
  // cta: String,
  // link: String,
});
</script>

<template>
  <div
    class="flex lg:flex-row flex-col justify-center items-center py-6 my-6 bg-cover bg-no-repeat bg-center lg:gap-0 gap-8"
    :class="direction === 'rtl' ? 'lg:flex-row-reverse' : 'lg:flex-row'"
  >
    <div class="lg:w-1/2 w-full flex gap-4 justify-center items-start px-8">
      <div
        class="w-full space-y-4 flex flex-col justify-center items-center"
      >
        <h2
          class="text-4xl font-bold font-synonym text-indigo-500 text-center lg:px-0 px-8"
        >
          {{ title }}
        </h2>
        <p class="md:text-justify text-center font-thin font-amulya">
          {{ description }}
        </p>
        <div
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl w-full"
        ></div>
      </div>
    </div>
    <div class="lg:w-1/2 w-full flex justify-center items-center p-8">
      <div class="bg-gray-900 w-full aspect-[16/9] rounded-xl relative">
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
          <div class="w-full h-full">
            <div class="w-full h-full relative">
              <video
                class="absolute inset-0 w-full h-full object-cover"
                loop
                muted
                autoplay
                :src="video"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
