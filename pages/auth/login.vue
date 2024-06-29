<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { ref, reactive } from 'vue';

definePageMeta({
  middleware: ['logged']
});

const supabase = useSupabaseClient();

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email:'',
  password:'',
});

const isLoading = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (isLoading.value) return;
  
  isLoading.value = true;
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: state.email ,
    password: state.password
  });
  
  
  isLoading.value = false;

  if (error) {
    console.error("Login error:", error.message);
  } else {
    console.log("Login successful:", data);
    navigateTo('/projects' )
  }
}
</script>

<template>
  <div class="w-[500px] mx-auto mt-24">
    <h1 class="text-center text-3xl">login</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit" :disabled="isLoading"> Submit </UButton>
    </UForm>
  </div>
</template>
