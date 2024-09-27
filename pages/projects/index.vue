<script setup>
import Dialog from "primevue/dialog";

const supabase = useSupabaseClient();
const router = useRouter();

definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});

const projects = ref([]);
const loading = ref(true);
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
  } finally {
    loading.value = false; // Set loading to false after data is fetched or error occurs
  }
  // setTimeout(() => {
  //   loading.value = false;
  //   console.log(projects.value.length);
  // }, 1000);
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

const createProjectDialog = ref(false);

const openCreateProjectDialog = () => {
  createProjectDialog.value = true;
};
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-4 pb-8 pt-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-synonym">My Projects</h1>
      <div>
        <button
          class="flex justify-center items-center gap-2 py-1 px-2 text-white rounded-md bg-indigo-600 hover:bg-indigo-700"
          @click="openCreateProjectDialog"
        >
          <p>New</p>
          <IconsAdd class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Projects -->
    <div v-if="loading" class="grid grid-cols-3 gap-8 mt-12">
      <CardProjectSkeleton />
      <CardProjectSkeleton />
      <CardProjectSkeleton />
    </div>

    <!-- Show "no projects" message if there are no projects and not loading -->
    <div
      v-else-if="projects.length === 0"
      class="mt-12 flex flex-col items-center justify-center gap-6"
    >
      <p class="text-2xl text-slate-500 font-synonym">
        You don't have any projects yet. Create one now!
      </p>
      <button
        class="flex justify-center items-center gap-2 py-1 px-2 text-white rounded-md bg-indigo-600 hover:bg-indigo-700"
        @click="navigateToCreateProject"
      >
        <p>Create Your First Project</p>
        <IconsAdd class="w-4 h-4" />
      </button>
      <img
        src="~/assets/empty.png"
        class="w-1/4"
        alt="no projects illustration"
      />
    </div>

    <!-- Show the projects if they exist -->
    <div v-else class="grid grid-cols-3 gap-8 mt-12">
      <CardProject
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
  <!-- Projects Creation Dialog -->
  <Dialog
    v-model:visible="createProjectDialog"
    modal
    header="Create New Project"
    :style="{ width: '60%' }"
  >
    <CardCreateProject />
  </Dialog>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
