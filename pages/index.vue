<script setup>
definePageMeta({
  layout: "home",
});

const { overviewImage } = useImageTransform();
</script>

<template>
  <!-- Header Section -->
  <div
    class="bg-slate-100 text-dark font-amulya bg-[linear-gradient(to_right,#5968ee15_1px,transparent_1px),linear-gradient(to_bottom,#5968ee15_1px,transparent_1px)] bg-[size:24px_24px]"
  >
    <div
      class="mx-auto max-w-screen-xl flex flex-col justify-center items-center pt-24"
    >
      <h1 class="text-6xl font-bold text-center capitalize text-slate-700">
        Never Lose Track <br />
        Of <span class="text-indigo-500">Your Projects</span> Again
      </h1>
      <h2 class="mt-8 text-2xl font-synonym text-center capitalize">
        Track all your projects in one place, easily, effectively,
        <span class="relative"
          >and for free

          <img
            src="~/assets/underline.png"
            alt="underline"
            class="absolute right-0"
          />
        </span>
      </h2>
      <div class="flex gap-8 mt-12 justify-center uppercase">
        <!-- Link to dashboard -->
        <UButton size="xl" class="uppercase" block>Get Started</UButton>
        <!-- Link to demo login -->
        <UButton color="white" class="uppercase font-bold" block>Try Demo</UButton>

      </div>
      <div class="my-12 flex justify-center test">
        <img
          src="~/assets/test.png"
          alt="overview"
          ref="overviewImage"
          class="overview border-4 border-white z-10 rounded-xl shadow-primary shadow-2xl w-[1000px] transition-all duration-1000"
        />
      </div>
    </div>
    <!-- Page Divider -->
    <div style="overflow: hidden">
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
        style="
          fill: #ffffff;
          width: 100%;
          height: 80px;
          transform: rotate(180deg) scaleX(-1);
        "
      >
        <path
          d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
          opacity=".25"
        />
        <path
          d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z"
          opacity=".5"
        />
        <path
          d="M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z"
        />
      </svg>
    </div>
  </div>

  <!-- Showcase Section -->
  <div class="mx-auto max-w-screen-xl py-8 font-amulya">
    <h2 class="text-center mt-8 text-pr-700 capitalize font-bold">
      Tired of unfinished projects?
    </h2>
    <div>
      <ShowCaseCart
        direction="ltr"
        title="Title"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae libero ea fuga fugit neque, itaque voluptatibus dicta ipsam veritatis. Ad vitae blanditiis maiores! Distinctio!"
        image="./assets/showcase/github.gif"
        cta="Start Tracking"
        link="https://github.com/TrackAll/trackall"
      />
      <ShowCaseCart
        direction="rtl"
        title="Title"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae libero ea fuga fugit neque, itaque voluptatibus dicta ipsam veritatis. Ad vitae blanditiis maiores! Distinctio!"
        image="~/assets/showcase/github.gif"
        link="https://github.com/TrackAll/trackall"
      />
      <ShowCaseCart
        direction="ltr"
        title="Title"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae libero ea fuga fugit neque, itaque voluptatibus dicta ipsam veritatis. Ad vitae blanditiis maiores! Distinctio!"
        image="~/assets/showcase/github.gif"
        link="https://github.com/TrackAll/trackall"
      />
    </div>
  </div>

  <!-- Github Section -->
  <div
    class="mx-auto max-w-screen-xl py-8 px-10 font-amulya grid place-items-center"
  >
    <div
      class="w-fit bg-gradient-to-tr from-slate-600 to-gray-800 rounded-xl h-fit flex justify-center items-center gap-24 px-16 py-6"
    >
      <div class="w-2/3 space-y-2">
        <h3 class="text-2xl font-bold font-synonym text-gray-100 text-nowrap">
          Open Source: Make It Your Own
        </h3>
        <p class="text-gray-300 text-justify text-nowrap">
          Explore the code, host your own version, and don’t forget to give it a
          star ⭐.
        </p>
        <a
          href="https://github.com/Mohamed-Galdi/TrackAll"
          target="_blank"
          class="bg-slate-900 text-slate-200 py-2 px-4 rounded-xl w-fit border-slate-200 border-2 flex justify-center items-center gap-2 hover:bg-indigo-600 transition-all duration-300 ease-in-out"
        >
          <p>Github Repo</p>
          <IconsTarget class="h-5 w-5" />
        </a>
      </div>
      <div class="w-1/3 flex justify-center items-center">
        <img
          src="~/assets/github.png"
          alt="github"
          class="w-40 h-40 object-cover invert"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.overview {
  transition: transform 1s ease;
  transform: perspective(400px) rotateX(15deg) scale(50%) translateY(-300px); /* Initial state */
}
</style>
