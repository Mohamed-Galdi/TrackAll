<script setup>

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const name = ref("");
const error = ref(null);
const projectId = route.params.id;

const fetchProject = async () => {
  try {
    const { data, error: fetchError } = await supabase
      .from("projects")
      .select("name")
      .eq("id", projectId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    name.value = data.name;
  } catch (err) {
    error.value = err.message;
    console.error("Fetch project error:", error.value);
  }
};

const updateProject = async () => {
  try {
    const { data, error: updateError } = await supabase
      .from("projects")
      .update({ name: name.value })
      .eq("id", projectId);

    if (updateError) {
      throw updateError;
    }

    router.push("/projects");
  } catch (err) {
    error.value = err.message;
    console.error("Update project error:", error.value);
  }
};

onMounted(fetchProject);
</script>
<template>
  <div class="container mx-auto mt-8">
    <h1 class="text-center text-5xl mb-8">Edit Project</h1>
    <form @submit.prevent="updateProject">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
          >Project Name:</label
        >
        <input
          type="text"
          id="name"
          v-model="name"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="text-center">
        <UButton color="black" variant="solid" type="submit"
          >Update Project</UButton
        >
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
