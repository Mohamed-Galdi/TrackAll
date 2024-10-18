<script setup>
import Dialog from "primevue/dialog";

const supabase = useSupabaseClient();

definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});

const projects = ref([]);
const loading = ref(true);
const error = ref(null);

// Fetch projects with sorting, filtering, and task counting
async function fetchProjects() {
  try {
    loading.value = true;

    // Fetch projects and apply filters
    let query = supabase.from("projects").select();

    // Apply filter by status if selected
    if (filterStatus.value) {
      query = query.eq("status", filterStatus.value);
    }

    // Sort by creation date if it's enabled
    if (sortCreated.value !== "none") {
      query = query.order("created_at", {
        ascending: sortCreated.value === "oldest",
      });
    }

    // Sort by updated date if selected
    if (sortUpdated.value !== "none") {
      query = query.order("updated_at", {
        ascending: sortUpdated.value === "oldest",
      });
    }

    // Fetch projects
    const { data: projectsData, error: fetchProjectsError } = await query;

    if (fetchProjectsError) {
      throw fetchProjectsError;
    }

    // Fetch tasks
    const { data: tasksData, error: fetchTasksError } = await supabase
      .from("tasks")
      .select("id, project_id, closed_at");

    if (fetchTasksError) {
      throw fetchTasksError;
    }

    // Calculate task counts for each project
    const projectTaskCounts = projectsData.map((project) => {
      const tasksForProject = tasksData.filter(
        (task) => task.project_id === project.id
      );

      const totalTasks = tasksForProject.length;
      const openTasks = tasksForProject.filter(
        (task) => task.closed_at === null
      ).length;
      const closedTasks = tasksForProject.filter(
        (task) => task.closed_at !== null
      ).length;

      return {
        ...project,
        totalTasks,
        openTasks,
        closedTasks,
      };
    });

    // Assign the calculated data to the projects
    projects.value = projectTaskCounts;
  } catch (err) {
    error.value = err.message;
    console.error("Fetch projects or tasks error:", error.value);
  } finally {
    loading.value = false;
  }
}

// Apply sorting and filtering
function applySortAndFilter() {
  fetchProjects(); // Re-fetch projects when sorting or filtering changes
}
onMounted(fetchProjects);

const createProjectDialog = ref(false);
const openCreateProjectDialog = () => {
  createProjectDialog.value = true;
};

// Sorting and filtering options
const sortCreated = ref("newest"); // default sorting
const sortUpdated = ref("newest"); // default sorting
const filterStatus = ref(""); // default no filter
const sortOptions = [
  { label: "None", value: "none" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const statusOptions = [
  { label: "All", value: "" },
  { label: "💡 idea", value: "idea" },
  { label: "💻 in_progress", value: "in_progress" },
  { label: "🏆 completed", value: "completed" },
  { label: "🌐 live", value: "live" },
  { label: "📝 needs_update", value: "needs_update" },
  { label: "🛠️ maintenance", value: "maintenance" },
  { label: "⛔ cancelled", value: "cancelled" },
];
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-4 pb-4 pt-8">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-synonym">My Projects {{ projects.length && projects.length > 0 ? `(${projects.length})` : '' }}</h1>
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

    <!-- Filters -->
    <div
      class="flex flex-wrap justify-start items-start gap-4 mt-8 "
    >
      <div class="w-fit">
        <label
          for="sortCreated"
          class="block text-xs font-medium text-indigo-700 mb-1 ms-1"
          >Creation date</label
        >
        <Dropdown
          v-model="sortCreated"
          :options="sortOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Select sorting"
          class="w-full text-sm"
          @change="applySortAndFilter"
        />
      </div>

      <div class="w-fit">
        <label
          for="sortUpdated"
          class="block text-xs font-medium text-indigo-700 mb-1 ms-1"
          >Updated date</label
        >
        <Dropdown
          v-model="sortUpdated"
          :options="sortOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Select sorting"
          class="w-full text-sm"
          @change="applySortAndFilter"
        />
      </div>

      <div class="w-fit">
        <label
          for="filterStatus"
          class="block text-xs font-medium text-indigo-700 mb-1 ms-1"
          >Status</label
        >
        <Dropdown
          v-model="filterStatus"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Select status"
          class="w-full text-sm"
          @change="applySortAndFilter"
        />
      </div>
    </div>

    <!-- Projects -->
    <div v-if="loading" class="grid lg:grid-cols-3 grid-cols-1 gap-8 mt-6">
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
        @click="openCreateProjectDialog"
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
    <div v-else class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-6">
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
    class="w-[90%] md:w-[60%]"
    :style="{ backgroundColor: '#f5f5f5' }"
  >
    <CardCreateProject />
  </Dialog>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
