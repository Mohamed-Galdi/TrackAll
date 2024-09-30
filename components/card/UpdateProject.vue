<script setup>
import { useToast } from "primevue/usetoast"; 

const toast = useToast();

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const statuses = ref([
  { name: "💡 idea", value: "idea" },
  { name: "💻 in_progress", value: "in_progress" },
  { name: "🏆 completed", value: "completed" },
  { name: "🌐 live", value: "live" },
  { name: "⛔ cancelled", value: "cancelled" },
  { name: "🛠️ maintenance", value: "maintenance" },
  { name: "📅 planned", value: "planned" },
]);

const logoFile = ref(null);
const logoPreview = ref(props.project.logo);
const name = ref(props.project.name);
const selectedStatus = ref(statuses.value.find(s => s.value === props.project.status) || null);
const selectedTechs = ref(props.project.tech_stack.map(tech => ({ name: tech })));
const description = ref(props.project.description || '');


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

// Rich Text Editor Config
const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const submitting = ref(false);
const errorMessage = ref("");

const validationErrors = ref({
  name: null,
  selectedTechs: null,
});

// Project update function
async function updateProject() {
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
    validationErrors.value.selectedTechs = "At least one technology must be selected.";
  }

  // If there are any validation errors, stop the submission
  if (validationErrors.value.name || validationErrors.value.selectedTechs) {
    return;
  }

  if (!user.value) {
    alert("You must be logged in to update a project");
    return;
  }

  submitting.value = true;
  errorMessage.value = "";

  try {
    // Check if the project belongs to the authenticated user
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select('user_id')
      .eq('id', props.project.id)
      .single();

    if (projectError) throw projectError;

    if (projectData.user_id !== user.value.id) {
      throw new Error("You don't have permission to update this project");
    }

    let logoUrl = props.project.logo;

    // Upload new logo if selected
    if (logoFile.value) {
      const fileExt = logoFile.value.name.split(".").pop();
      const fileName = `${name.value.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.${fileExt}`;
      const filePath = `${user.value.id}/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("logos")
        .upload(filePath, logoFile.value);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from("logos")
        .getPublicUrl(filePath);

      if (urlError) {
        throw urlError;
      }

      logoUrl = publicUrl;
    }

    // Prepare the updated tech stack
    const updatedTechStack = selectedTechs.value.map(tech => tech.name);

    const { data, error } = await supabase
      .from("projects")
      .update({
        name: name.value,
        logo: logoUrl,
        status: selectedStatus.value?.value,
        description: description.value,
        tech_stack: updatedTechStack,
        updated_at: new Date().toISOString(),
      })
      .eq('id', props.project.id)
      .select();

    if (error) throw error;

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Project updated successfully",
      life: 3000,
    });
    window.location.reload();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error updating project: " + error.message,
      life: 3000,
    });
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="p-2 space-y-8">
    <div class="flex w-full gap-2">
      <!-- Project Logo -->
      <div class="flex flex-col justify-center items-start w-1/6 relative">
        <label for="logo" class="flex items-center gap-2 text-sm font-amulya ms-1">
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
      <div class="flex flex-col w-3/6">
        <label for="name" class="flex items-center gap-2 text-sm font-amulya">Name</label>
        <InputText type="text" v-model="name" />
        <small v-if="validationErrors.name" class="text-red-500">{{ validationErrors.name }}</small>
      </div>
      <!-- Project Status -->
      <div class="w-2/6">
        <label for="status" class="flex items-center gap-2 text-sm font-amulya">Status</label>
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
      <label for="description" class="flex items-center gap-2 text-sm font-amulya ms-1">
        Description <span class="text-xs font-light">(Optional)</span>
      </label>
      <div>
        <Textarea v-model="description" rows="5" cols="30" class="w-full" />
      </div>
    </div>
    <!-- Project Tech Stack -->
    <div class="w-full">
      <label for="techs" class="flex items-center gap-2 text-sm font-amulya ms-1">Tech Stack</label>
      <MultiSelect
        v-model="selectedTechs"
        display="chip"
        :options="Techs"
        optionLabel="name"
        filter
        placeholder="Select Tech Stack"
        :maxSelectedLabels="8"
        class="w-full"
      />
      <small v-if="validationErrors.selectedTechs" class="text-red-500">
        {{ validationErrors.selectedTechs }}
      </small>
    </div>
    <!-- Update Project Button -->
    <div class="">
      <BtnMain @click="updateProject" :disabled="submitting">
        {{ submitting ? "Updating..." : "Update Project" }}
      </BtnMain>
    </div>
    <!-- Error message display -->
    <small v-if="errorMessage" class="text-red-500">{{ errorMessage }}</small>
  </div>
</template>