<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const supabase = useSupabaseClient();

const isLoading = ref(false);

const state = reactive({
  email: 'demo@demo.com',
  password: '00000000',
});

const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

type Schema = InferType<typeof schema>;



async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (isLoading.value) return;
  
  isLoading.value = true;
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: state.email ,
    password: state.password
  });
  
  
  isLoading.value = false;

  if (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid email or password', life: 3000 });
    console.error("Login error:", error.message);
  } else {
    // console.log("Login successful:", data);
    navigateTo('/projects' )
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
    <h1 class="text-3xl font-bold text-indigo-500">Demo Account</h1>
    <h2>Login in to demo account to see the app in action</h2>
  </div>
 
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password"  />
    </UFormGroup>
    <UButton type="submit" class="w-full flex justify-center" :disabled="isLoading">Continue</UButton>
  </UForm>
   <div class="w-full text-center text-sm mt-4">
    <p>Email: <span class="font-bold">demo@demo.com</span></p>
    <p>Password: <span class="font-bold">00000000</span></p>
  </div>
  
</template>
