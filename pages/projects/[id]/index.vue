<script setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();

// get the project id from the url
const projectId = route.params.id;

const deleteProject = () => {
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
        detail: "Record deleted",
        life: 3000,
      });
      await router.push("/projects");
    },
    reject: () => {},
  });
};

// ////////////////////////////
definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});

// get the project from supabase
const { data: project, error } = await useSupabaseClient()
  .from("projects")
  .select()
  .eq("id", projectId)
  .single();

if (error) {
  console.error("Error fetching project:", error.message);
}
</script>

<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="max-w-screen-xl mx-auto px-4 pb-8 pt-8">
    <!-- buttons -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <NuxtLink
          to="/projects"
          class="flex justify-center items-center gap-2 py-1 px-2 text-white rounded-md cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 ease-in-out"
        >
          <IconsArrow class="w-4 h-4" />
          <p>Back to Projects</p>
        </NuxtLink>
      </div>
      <div class="flex gap-2">
        <button
          class="flex justify-center items-center gap-2 py-1 px-2 text-white rounded-md bg-[#efb900] hover:bg-[#e5a533] transition-all duration-300 ease-in-out"
        >
          <p>Edit Project</p>
          <IconsEdit class="w-4 h-4" />
        </button>
        <button
          @click="deleteProject"
          class="flex justify-center items-center gap-2 py-1 px-2 text-white rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out"
        >
          <p>Delete Project</p>
          <IconsDelete class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div>
      <Tabs value="0">
        <TabList>
          <Tab value="0">Project Details</Tab>
          <Tab value="1">Project Tasks</Tab>
          <Tab value="2">Project Notes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <CardProjectDetails :project="project" />
          </TabPanel>
          <TabPanel value="1">
            <p>Project Tasks</p>
          </TabPanel>
          <TabPanel value="2">
            <p>Project Notes</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<style scoped></style>
