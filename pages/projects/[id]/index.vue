<script setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";

definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});

import ProjectDetails from "@/components/card/ProjectDetails.vue";
import Tasks from "@/components/Tasks.vue";
import Notes from "@/components/Notes.vue";

const activeTab = ref("details");
const setActiveTab = (tab) => {
  activeTab.value = tab;
};

// Create an object with the actual component references
const componentMap = {
  details: ProjectDetails,
  tasks: Tasks,
  notes: Notes,
};

// Use computed property to get the correct component
const currentComponent = computed(() => componentMap[activeTab.value]);

const confirm = useConfirm();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();

// get the project id from the url
const projectId = route.params.id;

// auth user
const user = useSupabaseUser();
const userId = user.value.id;

async function fetchProjectWithTaskCounts(projectId) {
  try {
    // Fetch the project by its ID
    const { data: projectData, error: fetchProjectError } =
      await useSupabaseClient()
        .from("projects")
        .select()
        .eq("id", projectId)
        .single();

    if (fetchProjectError) {
      throw fetchProjectError;
    }

    // Fetch the tasks related to this project
    const { data: tasksData, error: fetchTasksError } =
      await useSupabaseClient()
        .from("tasks")
        .select("id, project_id, closed_at")
        .eq("project_id", projectId); // Get tasks specific to the project

    if (fetchTasksError) {
      throw fetchTasksError;
    }

    // Fetch notes related to this project
    const { data: notesData, error: fetchNotesError } =
      await useSupabaseClient()
        .from("notes")
        .select("id")
        .eq("project_id", projectId); // Get notes specific to the project

    if (fetchNotesError) {
      throw fetchNotesError;
    }

    // Total notes
    const totalNotes = notesData.length;

    // Calculate total, open, and closed tasks
    const totalTasks = tasksData.length;
    const openTasks = tasksData.filter(
      (task) => task.closed_at === null
    ).length;
    const closedTasks = tasksData.filter(
      (task) => task.closed_at !== null
    ).length;

    // Add task counts to the project object
    const projectWithTaskCounts = {
      ...projectData,
      totalTasks,
      openTasks,
      closedTasks,
      totalNotes,
    };

    return projectWithTaskCounts;
  } catch (err) {
    console.error("Fetch project or tasks error:", err.message);
    return null;
  }
}

const project = await fetchProjectWithTaskCounts(projectId);

if (!project || project.user_id !== userId) {
  router.push("/projects");
}

const updateProjectDialog = ref(false);
const openUpdateProjectDialog = () => {
  updateProjectDialog.value = true;
};

// List of default project IDs
const defaultProjectIds = [
  "061417d1-dd84-4df4-adcd-800384e7acdb", // EcoTrack
  "43b62111-9fa5-4631-a794-94fad5d1f0d4", // CryptoPortal
  "8af3d439-dacd-4fdb-80ee-0982cd8db7db", // TechTrove
  "5252ad64-41fe-482c-8f8a-db8e687135f7", // LinguaLink
  "be95b0d3-6849-4e70-be1d-7b9205d134a2", // MindfulMe
  "57d3c2c5-1efb-4eeb-b374-c1f57979136c", // SoundScape
];

// delete the project
const deleteProject = () => {
  // Check if the project is a default project
  if (defaultProjectIds.includes(projectId)) {
    toast.add({
      severity: "warn",
      summary: "Warning",
      detail: "You can't delete the default projects",
      life: 3000,
    });
    return; // Exit the function if it's a default project
  }

  confirm.require({
    message: "Do you want to delete this Project?",
    header: "Danger Zone",
    icon: "pi pi-info-circle",
    rejectLabel: "Cancel",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: async () => {
      // Delete the project from the database
      console.log(projectId);
      const { error: deleteError } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (deleteError) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error deleting project: " + deleteError.message,
          life: 3000,
        });
        return;
      }
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Project deleted",
        life: 3000,
      });
      await router.push("/projects");
    },
    reject: () => {},
  });
};
</script>

<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div v-if="project" class="max-w-screen-xl mx-auto px-4 pb-8 pt-8">
    <!-- buttons -->
    <div class="flex justify-between items-center mb-8">
      <!-- Back Button -->
      <div>
        <NuxtLink
          to="/projects"
          class="flex justify-center items-center gap-2 py-1 px-2 text-white rounded-md cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 ease-in-out"
        >
          <IconsArrow class="w-4 h-4" />
          <p>Projects</p>
        </NuxtLink>
      </div>

      <!-- Tab Buttons -->
      <div class="flex gap-4 px-4">
        <button
          class="p-1 w-24 rounded-md"
          :class="{
            'bg-indigo-200 text-indigo-800 border-indigo-400 border-2':
              activeTab === 'details',
            'bg-slate-50 text-slate-500 border border-slate-300 hover:bg-indigo-100 transition-all duration-300 ease-in-out':
              activeTab !== 'details',
          }"
          @click="setActiveTab('details')"
        >
          Details
        </button>
        <button
          class="p-1 w-24 rounded-md"
          :class="{
            'bg-indigo-200 text-indigo-800 border-indigo-400 border-2':
              activeTab === 'tasks',
            'bg-slate-50 text-slate-500 border border-slate-300 hover:bg-indigo-100 transition-all duration-300 ease-in-out':
              activeTab !== 'tasks',
          }"
          @click="setActiveTab('tasks')"
        >
          Tasks <span class="text-indigo-500 font-semibold"> ({{ project.openTasks }})</span>
        </button>
        <button
          class="p-1 w-24 rounded-md"
          :class="{
            'bg-indigo-200 text-indigo-800 border-indigo-400 border-2':
              activeTab === 'notes',
            'bg-slate-50 text-slate-500 border border-slate-300 hover:bg-indigo-100 transition-all duration-300 ease-in-out':
              activeTab !== 'notes',
          }"
          @click="setActiveTab('notes')"
        >
          Notes <span class="text-indigo-500 font-semibold"> ({{ project.totalNotes }})</span>
        </button>
      </div>

      <!-- Edit/Delete Buttons -->
      <div class="flex gap-2">
        <button
          @click="openUpdateProjectDialog"
          class="flex justify-center items-center gap-2 py-1 px-2 text-white rounded-md bg-[#efb900] hover:bg-[#e5a533] transition-all duration-300 ease-in-out"
        >
          <p>Edit</p>
          <IconsEdit class="w-4 h-4" />
        </button>
        <button
          @click="deleteProject"
          class="flex justify-center items-center gap-2 py-1 px-2 text-white rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out"
        >
          <p>Delete</p>
          <IconsDelete class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="p-4">
      <component :is="currentComponent" :project="project" />
    </div>
  </div>
  <!-- Projects Creation Dialog -->
  <Dialog
    v-model:visible="updateProjectDialog"
    modal
    header="Update This Project"
    :style="{ width: '60%', backgroundColor: '#f5f5f5' }"
  >
    <CardUpdateProject :project="project" />
  </Dialog>
</template>

<style scoped></style>
