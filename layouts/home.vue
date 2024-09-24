<script setup>
const isAuthOpen = ref(false);
const type = ref("login"); // Default to 'login'

function openAuthModal(authType) {
  type.value = authType; // Set the type to 'login' or 'register'
  isAuthOpen.value = true;
}

const user = useSupabaseUser(); // Get the current user
</script>

<template>
  <UModal v-model="isAuthOpen">
    <div class="p-4 bg-white rounded-lg">
      <AuthModal :type="type" />
    </div>
  </UModal>

  <div class="pt-16">
    <div
      id="header"
      class="fixed h-16 top-0 left-0 right-0 backdrop-blur-md bg-white/60 px-4 z-[9999]"
    >
      <nav
        class="flex justify-between py-2 items-center mx-auto max-w-screen-xl"
      >
        <NuxtLink to="/">
          <img
            src="~/assets/logos/dark_trans.png"
            alt="track all logo"
            class="max-w-[80px]"
          />
        </NuxtLink>
        <div>
          <div v-if="user" class="flex justify-center items-center gap-4">
            <NuxtLink
              to="/projects"
              class="text-white px-2 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 ease-in-out"
            >
              My Projects
            </NuxtLink>
          </div>
          <div v-else class="flex justify-center items-center gap-4">
            <button
              label="Open"
              @click="openAuthModal('login')"
              to="/auth/login"
              class="text-slate-800 font-bold hover:text-indigo-500 transition-all duration-300 ease-in-out"
            >
              Login
            </button>
            <button
              label="Open"
              @click="openAuthModal('register')"
              to="/auth/register"
              class="text-white px-2 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 ease-in-out"
            >
              Register
            </button>
          </div>
        </div>
      </nav>
    </div>

    <div id="main" class="">
      <slot></slot>
    </div>

    <div
      id="footer"
      class="w-full bg-gradient-to-t from-blue-200 to-white pb-4"
    >
      <div
        class="mx-auto max-w-screen-xl py-8 px-10 font-amulya flex md:flex-row flex-col justify-between items-center text-center md:gap-0 gap-3"
      >
        <div
          class="md:w-1/3 w-full flex justify-center items-center gap-4 order-2 md:order-1"
        >
          <a href="https://github.com/Mohamed-Galdi" target="_blank">
            <IconsGithub
              class="w-8 h-8 text-slate-800 hover:text-indigo-500 transition-all duration-300 ease-in-out"
            />
          </a>
          <a href="https://x.com/GaldiMohamed" target="_blank">
            <IconsTwitter
              class="w-8 h-8 text-slate-800 hover:text-indigo-500 transition-all duration-300 ease-in-out"
            />
          </a>
          <a href="https://www.galdi.dev/" target="_blank">
            <IconsPortfolio
              class="w-9 h-9 text-slate-800 hover:text-indigo-500 transition-all duration-300 ease-in-out"
            />
          </a>
        </div>

        <div class="md:w-1/3 w-full text-center order-1 md:order-2">
          <p class="font-synonym">
            Made by
            <a
              href="https://www.galdi.dev/"
              target="_blank"
              class="text-slate-800 font-bold"
              >M-Galdi</a
            >
          </p>
        </div>

        <div
          class="md:w-1/3 w-full flex justify-center items-center gap-4 order-3 md:order-3"
        >
          <NuxtLink
            to="/privacy-policy"
            class="text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900"
          >
            Privacy Policy
          </NuxtLink>
          <NuxtLink
            to="/terms-of-service"
            class="text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900"
          >
            Terms of Service
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#header {
  border-bottom: 1px solid rgba(79, 70, 229, 0.2); /* Adjust the color and opacity as needed */
}
</style>
