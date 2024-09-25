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
      <!-- Project Card -->
      <div
        v-for="i in 1"
        :key="i"
        class="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-md h-96 cursor-pointer hover:shadow-sm hover:scale-[0.99] transition-all duration-300 ease-in-out"
      >
        <div class="flex justify-start items-center gap-4">
          <div
            class="min-w-16 h-16 bg-slate-300 rounded-md border border-white"
          ></div>
          <div class=" ">
            <h2
              class="font-bold text-xl font-amulya text-slate-700 line-clamp-1"
            >
              Project Name
            </h2>
            <CardStatus type="in_progress" />
          </div>
        </div>

        <div class="flex justify-between items-center gap-4 mt-4 pe-4">
          <div class="w-2/3 flex flex-col justify-start gap-1">
            <div class="rounded-lg">
              <p class="text-sm text-slate-400">created:</p>
              <p class="text-sm font-semibold text-slate-700">
                2023-01-01 (2 days ago)
              </p>
            </div>
            <div class="rounded-lg">
              <p class="text-sm text-slate-400">Updated:</p>
              <p class="text-sm font-semibold text-slate-700">
                2023-01-01 (2 days ago)
              </p>
            </div>
          </div>

          <div class="w-1/3 grid place-items-center">
            <CardProgress :progress="40" class="w-full" />
          </div>
        </div>
        <div>
          <h3>Tech Stack:</h3>
          <div class="grid grid-cols-8 gap-2 justify-start items-center mt-2">
            <TechTailwind />
            <TechLaravel />
            <TechVue />
            <TechReact />
            <TechHtml />
            <TechCss />
            <TechJs />
            <TechPhp />
            <TechPython />
            <TechRust />
            <TechAngular />
            <TechC />
            <TechCsharp />
            <TechCpp />
            <TechJava />
            <TechFlutter />
            <TechMysql />
            <TechNext />
            <TechNode />
            <TechNuxt />
            <TechPostgresql />
            <TechTypescript />
            <TechGo />
            <TechDocker />
            <!-- <TechDjango /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
