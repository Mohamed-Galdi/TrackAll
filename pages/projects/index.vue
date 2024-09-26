<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});

const projects = ref([]);
const error = ref(null);

async function fetchProjects() {
  try {
    const { data, error: fetchError } = await supabase
      .from("projects")
      .select();

    if (fetchError) {
      throw fetchError;
    } else {
      projects.value = data;
    }
  } catch (err) {
    error.value = err.message;
    console.error("Fetch projects error:", error.value);
  }
}

onMounted(fetchProjects);

async function logout() {
  const { error: logoutError } = await supabase.auth.signOut();
  if (logoutError) {
    console.error("Logout error:", logoutError.message);
  } else {
    router.push("/");
  }
}

const navigateToCreateProject = () => {
  router.push("/create-project");
};

const editProject = (projectId) => {
  router.push(`projects/edit-project-${projectId}`);
};

const deleteProject = async (projectId) => {
  try {
    const { data, error: deleteError } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (deleteError) {
      throw deleteError;
    }

    fetchProjects(); // Refresh the list after deletion
  } catch (err) {
    error.value = err.message;
    console.error("Delete project error:", error.value);
  }
};
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-4 pb-8 pt-4">
    <h1 class="text-2xl font-synonym">My Projects</h1>
    <!-- loop in range from 1 to 4 -->
    <div class="grid grid-cols-3 gap-8 mt-12">
      <CardProject v-for="project in projects" :key="project.id" :project="project" />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
