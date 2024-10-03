<script setup>
import { useToast } from "primevue/usetoast";


const toast = useToast();
const router = useRouter();

const logoFile = ref(null);
const logoPreview = ref(null);
const name = ref(null);
const selectedStatus = ref([]);
const description = ref(null);
const selectedTechs = ref([]);

const statuses = ref([
  { name: "💡 idea", value: "idea" },
  { name: "💻 in_progress", value: "in_progress" },
  { name: "🏆 completed", value: "completed" },
  { name: "🌐 live", value: "live" },
  { name: "📝 needs_update", value: "needs_update" },
  { name: "🛠️ maintenance", value: "maintenance" },
  { name: "⛔ cancelled", value: "cancelled" },
]);

const Techs = ref([
  { name: "nuxt" },
  { name: "tailwind" },
  { name: "laravel" },
  { name: "vue" },
  { name: "react" },
  { name: "html" },
  { name: "css" },
  { name: "javascript" },
  { name: "php" },
  { name: "python" },
  { name: "rust" },
  { name: "angular" },
  { name: "c" },
  { name: "csharp" },
  { name: "cpp" },
  { name: "java" },
  { name: "flutter" },
  { name: "mysql" },
  { name: "next" },
  { name: "node" },
  { name: "postgresql" },
  { name: "typescript" },
  { name: "go" },
  { name: "docker" },
  { name: "wordpress" },
  { name: "webflow" },
  { name: "phoenix" },
  { name: "flask" },
  { name: "kotlin" },
  { name: "ror" },
  { name: "ruby" },
  { name: "spring" },
  { name: "svelte" },
  { name: "swift" },
  { name: "elixir" },
  { name: "django" },
  { name: "mongodb" },
  { name: "adonis" },
  { name: "alpine" },
  { name: "astro" },
  { name: "aws" },
  { name: "bootstrap" },
  { name: "do" },
  { name: "livewire" },
  { name: "inertia" },
]);

// Function to get a random default logo URL
function getRandomDefaultLogo() {
  const logoNumber = Math.floor(Math.random() * 7) + 1;
  return supabase.storage
    .from("logos")
    .getPublicUrl(`defaultLogos/logo${logoNumber}.png`).data.publicUrl;
}

// Set a random default logo on component mount
onMounted(() => {
  logoPreview.value = getRandomDefaultLogo();
});

// Logo Selection Function
function onFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  logoFile.value = file;

  // Create a preview
  const reader = new FileReader();
  reader.onload = (e) => {
    logoPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
}

const supabase = useSupabaseClient();
const user = useSupabaseUser();

// Add a new ref for form submission status
const submitting = ref(false);
const errorMessage = ref("");

// Add a new ref for form validation errors
const validationErrors = ref({
  name: null,
  selectedTechs: null,
});

// Project creation function
async function createProject() {
  // Reset validation errors
  validationErrors.value = {
    name: null,
    selectedTechs: null,
  };

  // Simple validation for project name
  if (!name.value) {
    validationErrors.value.name = "Project name is required.";
  }

  // Simple validation for tech stack (at least one tech must be selected)
  if (selectedTechs.value.length === 0) {
    validationErrors.value.selectedTechs =
      "At least one technology must be selected.";
  }

  // If there are any validation errors, stop the submission
  if (validationErrors.value.name || validationErrors.value.selectedTechs) {
    return;
  }

  if (!user.value) {
    alert("You must be logged in to create a project");
    return;
  }

  submitting.value = true;
  errorMessage.value = "";

  try {
    let logoUrl = null;

    // Upload logo if selected, otherwise use the random default logo
    if (logoFile.value) {
      const fileExt = logoFile.value.name.split(".").pop();
      const fileName = `${name.value
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now()}.${fileExt}`;
      const filePath = `${user.value.id}/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("logos")
        .upload(filePath, logoFile.value);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
        error: urlError,
      } = supabase.storage.from("logos").getPublicUrl(filePath);

      if (urlError) {
        throw urlError;
      }

      logoUrl = publicUrl;
    } else {
      // Use the current preview URL, which is either a user-selected image or a random default logo
      logoUrl = logoPreview.value;
    }

    const { data, error } = await supabase
      .from("projects")
      .insert({
        user_id: user.value.id,
        name: name.value,
        logo: logoUrl,
        status: selectedStatus.value?.value,
        description: description.value,
        tech_stack: selectedTechs.value.map((tech) => tech.name),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) throw error;

    // Clear form after successful submission
    logoFile.value = null;
    logoPreview.value = getRandomDefaultLogo(); // Set a new random default logo
    name.value = null;
    selectedStatus.value = null;
    description.value = null;
    selectedTechs.value = [];

    // console.log('Project created successfully:', data);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Project created successfully",
      life: 3000,
    });
    // Use router.go to force a reload of the current page
    await router.push("/projects");
    router.go();
  } catch (error) {
    // console.error('Error creating project:', error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error creating project: " + error.message,
      life: 3000,
    });
    // Use router.go to force a reload of the current page
    await router.push("/projects");
    router.go();
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="p-2 space-y-8">
    <div class="flex lg:flex-row flex-col  w-full gap-2">
      <!-- Project Logo -->
      <div class="flex flex-col justify-center items-start lg:w-1/6 w-fit relative">
        <label
          for="logo"
          class="flex items-center gap-2 text-sm font-amulya ms-1"
        >
          Logo <span class="text-xs font-light">(Optional)</span>
        </label>
        <div class="relative w-full sm:w-16 h-16 my-1">
          <img
            v-if="logoPreview"
            :src="logoPreview"
            alt="Logo Preview"
            class="shadow-md rounded-xl w-full h-full object-cover bg-white"
            style="filter: grayscale(10%)"
          />
          <label
            for="logo-input"
            class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-xl cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200"
          >
            <span class="text-2xl">+</span>
          </label>
        </div>
        <input
          id="logo-input"
          type="file"
          class="hidden"
          accept="image/*"
          @change="onFileSelect"
        />
      </div>
      <!-- Project Name -->
      <div class="flex flex-col lg:w-3/6 w-full">
        <label for="name" class="flex items-center gap-2 text-sm font-amulya"
          >Name</label
        >
        <InputText type="text" v-model="name" />
        <small v-if="validationErrors.name" class="text-red-500">{{
          validationErrors.name
        }}</small>
      </div>
      <!-- Project Status -->
      <div class="lg:w-2/6 w-full">
        <label for="status" class="flex items-center gap-2 text-sm font-amulya"
          >Status</label
        >
        <Select
          v-model="selectedStatus"
          :options="statuses"
          optionLabel="name"
          placeholder="Select a State"
          class="w-full"
        />
      </div>
    </div>
    <!-- Project Description -->
    <div>
      <label
        for="description"
        class="flex items-center gap-2 text-sm font-amulya ms-1"
        >Description <span class="text-xs font-light">(Optional)</span></label
      >
      <div class="">
        <Textarea v-model="description" rows="5" cols="30" class="w-full" />
      </div>
    </div>
    <!-- Project Tech Stack -->
    <div class="w-full">
      <label
        for="techs"
        class="flex items-center gap-2 text-sm font-amulya ms-1"
        >Tech Stack</label
      >
      <MultiSelect
        v-model="selectedTechs"
        display="chip"
        :options="Techs"
        optionLabel="name"
        filter
        placeholder="SelectTech Stack"
        :maxSelectedLabels="8"
        class="w-full"
      />
      <small v-if="validationErrors.selectedTechs" class="text-red-500">{{
        validationErrors.selectedTechs
      }}</small>
    </div>
    <!-- Create Project Button -->
    <div class="">
      <BtnMain @click="createProject" :disabled="submitting">
        {{ submitting ? "Creating..." : "Create Project" }}
      </BtnMain>
    </div>
    <!-- Error message display -->
    <small v-if="errorMessage" class="text-red-500">{{ errorMessage }}</small>
  </div>
</template>

<style scoped></style>
