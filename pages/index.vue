<script setup>
import projectsVideo from "~/assets/showcase/projects.mp4";
import tasksVideo from "~/assets/showcase/tasks.mp4";
import notesVideo from "~/assets/showcase/notes.mp4";

definePageMeta({
  layout: "home",
});

const { overviewImage } = useImageTransform();

const type = ref("login");

const isAuthOpen = ref(false);

const router = useRouter();
const user = useSupabaseUser(); // Get the current user state from Supabase


function openAuthModal(authType) {
  if (user.value) {
    // If user is logged in, navigate to /projects
    router.push('/projects');
  } else {
    // If not logged in, open the auth modal
    type.value = authType; // Set auth type (login or register)
    isAuthOpen.value = true; // Open the modal
  }
}

</script>

<template>
  <!-- Auth Modal -->
  <UModal v-model="isAuthOpen">
    <div class="p-4 bg-white rounded-lg">
      <AuthModal :type="type" />
    </div>
  </UModal>
  <!-- Header Section -->
  <div
    class="bg-slate-100 text-dark font-amulya bg-[linear-gradient(to_right,#5968ee15_1px,transparent_1px),linear-gradient(to_bottom,#5968ee15_1px,transparent_1px)] bg-[size:24px_24px]"
  >
    <div
      class="mx-auto max-w-screen-xl flex flex-col justify-center items-center pt-24 space-y-12"
    >
      <h1
        class="lg:text-6xl md:text-5xl text-4xl font-bold text-center capitalize text-slate-700"
      >
        Never Lose Track <br />
        Of <span class="text-indigo-500">Your Projects</span> Again
      </h1>
      <h2
        class="mt-8 lg:text-2xl md:text-xl text-lg font-synonym text-center capitalize md:px-0 px-4"
      >
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

      <div
        class="flex lg:flex-row flex-col gap-8 mt-12 justify-center items-center uppercase w-full mb-12 sm:mb-0"
      >
        <!-- Link to dashboard -->
        <BtnMain
          class="lg:w-72 w-[80%]"
          @click="openAuthModal('login')"
          >Get Started</BtnMain
        >
        <!-- Link to demo login -->
        <BtnSecond class="lg:w-72 w-[80%]" @click="openAuthModal('demo')"
          >Try Demo</BtnSecond
        >
      </div>

      <div class="my-12 flex justify-center test lg:px-0 px-4">
        <img
          src="~/assets/dashboard.png"
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
        title="Project Creation"
        description="Start managing your projects with ease! Our platform allows you to create projects in just a few clicks, providing a streamlined way to organize your ideas and objectives. No more scattered notes—everything you need is right at your fingertips."
        :video="projectsVideo"
      />
      <ShowCaseCart
        direction="rtl"
        title="Track Your Tasks"
        description="Stay motivated by marking tasks as done once they’re completed. Our intuitive system helps you visualize your progress and celebrate milestones along the way. Every completed task brings you one step closer to your project goals!"
        :video="tasksVideo"
      />
      <ShowCaseCart
        direction="ltr"
        title="Note Management"
        description="Keep all your project notes organized in one place. Instead of juggling between Notion, notepads, and random papers, easily add and access your thoughts and ideas within your project. This centralized approach enhances clarity and ensures you never lose track of valuable insights."
        :video="notesVideo"
      />
    </div>
  </div>

  <!-- Twitter Testimonials Section -->
  <div class="mx-auto max-w-screen-xl py-8 px-10 space-y-12">
    <h2 class="text-center mt-8 text-pr-700 capitalize font-bold">
      What People Say
    </h2>
    <div
      class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center py-4 lg:px-0 px-8 gap-4"
    >
      <img
        src="~/assets/tweets/tweet1.png"
        alt="testimonial"
        class="w-full h-full object-cover border-2 border-gray-900 rounded-xl overflow-hidden shadow-sm shadow-blue-400 md:-rotate-6 rotate-6 hover:scale-[1.05] hover:rotate-0 hover:shadow-xl hover:shadow-blue-300 hover:z-10 cursor-pointer transition-all duration-300 ease-in-out"
      />
      <img
        src="~/assets/tweets/tweet2.png"
        alt="testimonial"
        class="w-full h-full object-cover border-2 border-gray-900 rounded-xl overflow-hidden shadow-md shadow-blue-400 -rotate-2 hover:scale-[1.05] hover:rotate-0 hover:shadow-xl hover:shadow-blue-300 hover:z-10 cursor-pointer transition-all duration-300 ease-in-out"
      />
      <img
        src="~/assets/tweets/tweet3.png"
        alt="testimonial"
        class="w-full h-full object-cover border-2 border-gray-900 rounded-xl overflow-hidden shadow-md shadow-blue-400 rotate-6 hover:scale-[1.05] hover:rotate-0 hover:shadow-xl hover:shadow-blue-300 hover:z-10 cursor-pointer transition-all duration-300 ease-in-out"
      />
      <img
        src="~/assets/tweets/tweet4.png"
        alt="testimonial"
        class="w-full h-full object-cover border-2 border-gray-900 rounded-xl overflow-hidden shadow-md shadow-blue-400 rotate-6 hover:scale-[1.05] hover:rotate-0 hover:shadow-xl hover:shadow-blue-300 hover:z-10 cursor-pointer transition-all duration-300 ease-in-out"
      />
      <img
        src="~/assets/tweets/tweet5.png"
        alt="testimonial"
        class="w-full h-full object-cover border-2 border-gray-900 rounded-xl overflow-hidden shadow-md shadow-blue-400 rotate-2 hover:scale-[1.05] hover:rotate-0 hover:shadow-xl hover:shadow-blue-300 hover:z-10 cursor-pointer transition-all duration-300 ease-in-out"
      />
      <img
        src="~/assets/tweets/tweet6.png"
        alt="testimonial"
        class="w-full h-full object-cover border-2 border-gray-900 rounded-xl overflow-hidden shadow-md shadow-blue-400 -rotate-6 hover:scale-[1.05] hover:rotate-0 hover:shadow-xl hover:shadow-blue-300 hover:z-10 cursor-pointer transition-all duration-300 ease-in-out"
      />
    </div>
  </div>

  <!-- Github Section -->
  <div class="mx-auto max-w-screen-xl py-8 px-10 mt-8 font-amulya">
    <div
      class="bg-gradient-to-tr from-slate-600 to-gray-800 rounded-xl h-fit flex md:flex-row flex-col justify-center items-center md:gap-24 gap-2 md:px-16 px-8 py-6"
    >
      <div class="md:w-2/3 w-full space-y-2 md:order-1 order-last">
        <h3
          class="md:text-2xl text-lg font-bold font-synonym text-gray-100 md:text-start text-center"
        >
          Open Source: Make It Your Own
        </h3>
        <p class="text-gray-300 md:text-start text-center line-clamp-2">
          Explore the code, host your own version, and don’t forget to give it a
          star ⭐.
        </p>
        <a
          href="https://github.com/Mohamed-Galdi/TrackAll"
          target="_blank"
          class="bg-slate-900 text-slate-200 py-2 px-4 md:mx-0 mx-auto rounded-xl w-fit border-slate-200 border-2 flex justify-center items-center gap-2 hover:bg-indigo-600 transition-all duration-300 ease-in-out"
        >
          <p>Github Repo</p>
          <IconsTarget class="h-5 w-5" />
        </a>
      </div>
      <div
        class="md:w-1/3 w-full flex justify-center items-center md:order-last order-1"
      >
        <img
          src="~/assets/github.png"
          alt="github"
          class="md:w-40 md:h-40 w-24 h-24 object-cover invert"
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
