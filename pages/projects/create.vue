<script setup>

definePageMeta({
  middleware: ['auth']
});

const name = ref('');
const error = ref(null);
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

const createProject = async () => {
  try {
   
    const { data, error: insertError } = await supabase
      .from('projects')
      .insert([{ name: name.value, user_id: user.value.id }]);

    if (insertError) {
      throw insertError;
    }

    router.push('/projects');
  } catch (err) {
    error.value = err.message;
    console.error('Create project error:', error.value);
  }
};
</script>

<template>
  <div class="container mx-auto mt-8">
    <h1 class="text-center text-5xl mb-8">Create New Project</h1>
    <form @submit.prevent="createProject">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Project Name:</label>
        <input type="text" id="name" v-model="name" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="text-center">
        <UButton color="black" variant="solid" type="submit">Create Project</UButton>
      </div>
    </form>
    <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
  </div>
</template>



<style scoped>
.container {
  max-width: 800px;
}
</style>
