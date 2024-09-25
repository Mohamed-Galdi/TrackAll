<script setup>
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

async function logout() {
  const { error: logoutError } = await supabase.auth.signOut();
  if (logoutError) {
    console.error("Logout error:", logoutError.message);
  } else {
    router.push('/');
    toast.add({ severity: 'success', summary: 'Success', detail: 'Logout successful', life: 3000 });
  }
}
</script>

<template>
  <Toast />
  <div class="">
    <nav class="h-16 flex justify-between items-center mx-auto max-w-screen-xl ">
      <NuxtLink to="/">
        <img
          src="~/assets/logos/dark_trans.png"
          alt="track all logo"
          class="max-w-[80px]"
        />
      </NuxtLink>
      <div class="text-center">
        <UButton color="black" variant="solid" @click="logout">Logout</UButton>
      </div>
    </nav>

    <div id="main" class="bg-slate-100 min-h-screen">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
