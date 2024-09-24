<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const supabase = useSupabaseClient();

const isLoading = ref(false);

const state = reactive({
  username: '',
  email: '',
  password: '',
});

const schema = object({
  username: string().min(3, "Must be at least 3 characters").required("Required"),
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

type Schema = InferType<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (isLoading.value) return;
  
  isLoading.value = true;
  
  const { data, error } = await supabase.auth.signUp({
    email: state.email,
    password: state.password
  });
  
  
  isLoading.value = false;

  if (error) {
    console.error("Sign-up error:", error.message);
  } else {
    console.log("Sign-up successful:", data);
    navigateTo('/email-confirmation' )
  }
}

async function signInWithProvider(provider: 'google' | 'github') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider, // 'google' or 'github'
  });

  if (error) {
    console.error(`${provider} sign-in error:`, error.message);
  } else {
    console.log(`${provider} sign-in successful`, data);
  }
}
</script>

<template>
  <div class="w-full text-center">
    <h1 class="text-3xl font-bold">Register</h1>
    <h2>Create a new account</h2>
  </div>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

    <UFormGroup label="Username" name="username">
      <UInput v-model="state.username" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    <UButton type="submit" class="w-full flex justify-center" :disabled="isLoading">Continue</UButton>
  </UForm>
  <div class="flex justify-center items-center gap-4 mt-4 px-2">
    <div class="h-[1.5px] w-full bg-slate-400 mt-1"></div>
    <p>or</p>
    <div class="h-[1.5px] w-full bg-slate-400 mt-1"></div>
  </div>
  <div class="space-y-2 flex flex-col items-center justify-center">
    <button
      class="w-full mx-2 p-2 flex justify-center items-center gap-4 bg-slate-300/50 hover:bg-slate-300 rounded-lg"
      @click="signInWithProvider('google')"
    >
      <img src="~/assets/icons/google.png" alt="google logo" class="w-5 h-5">
      <p>Continue with Google</p>
    </button>
    <button
      class="w-full mx-2 p-2 flex justify-center items-center gap-4 bg-slate-300/50 hover:bg-slate-300 rounded-lg"
      @click="signInWithProvider('github')"
    >
      <img src="~/assets/icons/github.png" alt="github logo" class="w-6 h-6">
      <p>Continue with GitHub</p>
    </button>
  </div>
</template>
