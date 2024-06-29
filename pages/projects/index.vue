<script setup>


const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

definePageMeta({
  middleware: ["auth"],
});

const projects = ref([]);
const error = ref(null);

async function fetchProjects() {
  try {
    const { data, error: fetchError } = await supabase
      .from('projects')
      .select();
      
    if (fetchError) {
      throw fetchError;
    } else {
      projects.value = data;
    }
  } catch (err) {
    error.value = err.message;
    console.error('Fetch projects error:', error.value);
  }
}

onMounted(fetchProjects);

async function logout() {
  const { error: logoutError } = await supabase.auth.signOut();
  if (logoutError) {
    console.error("Logout error:", logoutError.message);
  } else {
    router.push("/login");
  }
}

const navigateToCreateProject = () => {
  router.push('/create-project');
};

const editProject = (projectId) => {
  router.push(`projects/edit-project-${projectId}`);
};

const deleteProject = async (projectId) => {
  try {
    const { data, error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (deleteError) {
      throw deleteError;
    }

    fetchProjects();  // Refresh the list after deletion
  } catch (err) {
    error.value = err.message;
    console.error('Delete project error:', error.value);
  }
};
</script>

<template>
  <div class="container mx-auto mt-8">
    <h1 class="text-center text-5xl mb-8">Projects</h1>
    <div class="text-center">
      <UButton color="black" variant="solid" @click="navigateTo('/projects/create')">Add New</UButton>
    </div>
    <p class="text-center mb-4">Logged in as: {{ user.email }}</p>
    <ul class="mb-8">
      <li v-for="project in projects" :key="project.id" class="mb-2 flex justify-between items-center">
        <span>{{ project.name }}</span>
        <div>
          <UButton color="blue" variant="solid" @click="editProject(project.id)">Edit</UButton>
          <UButton color="red" variant="solid" @click="deleteProject(project.id)">Delete</UButton>
        </div>
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
