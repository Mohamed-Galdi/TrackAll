<script setup>
import { ref, onMounted } from 'vue';
// import { useSupabaseUser, useSupabaseClient } from '@supabase/vue';
import { useRouter } from 'vue-router';

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

definePageMeta({
  middleware: ['auth']
});

const projects = ref([]);
const error = ref(null);

async function fetchProjects() {
  const { data, error: fetchError } = await supabase
    .from('projects')
    .select('*');

  if (fetchError) {
    error.value = fetchError.message;
  } else {
    projects.value = data;
  }
}

onMounted(fetchProjects);

async function logout() {
  const { error: logoutError } = await supabase.auth.signOut();
  if (logoutError) {
    console.error('Logout error:', logoutError.message);
  } else {
    router.push('/login');
  }
}
</script>

<template>
  <div class="container mx-auto mt-8">
    <h1 class="text-center text-5xl mb-8">Projects</h1>
    <p class="text-center mb-4">Logged in as: {{ user.email }}</p>
    <ul class="mb-8">
      <li v-for="project in projects" :key="project.id" class="mb-2">
        {{ project.name }}
      </li>
    </ul>
    <p v-if="error" class="text-red-500 text-center mb-4">{{ error }}</p>
    <div class="text-center">
      <UButton color="black" variant="solid" @click="logout">Logout</UButton>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
