<script setup>
import Toast from "primevue/toast";

useHead({
  title: "TrackAll - track your side projects",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      hid: "description",
      name: "description",
      content: "Track your side projects with ease",
    },
  ]
});

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

const userEmail = computed(() => user.value?.email);

async function logout() {
  const { error: logoutError } = await supabase.auth.signOut();
  if (logoutError) {
    console.error("Logout error:", logoutError.message);
  } else {
    router.push("/");
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Logout successful",
      life: 3000,
    });
  }
}
const items = [
  [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      click: () => logout(),
    }
  ]
]
</script>

<template>
  <Toast />
  <div class="">
    <nav class="h-16  px-4 flex justify-between items-center mx-auto max-w-screen-xl">
      <NuxtLink to="/">
        <img
          src="~/assets/logos/dark_trans.png"
          alt="track all logo"
          class="max-w-[80px]"
        />
      </NuxtLink>
      <div>
        <UDropdown
          :items="items"
          mode="hover"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            color="white"
            :label="userEmail"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
        </UDropdown>
      </div>
    </nav>

    <div id="main" class="bg-gray-100 min-h-screen">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
