<script setup>
import Editor from "primevue/editor";

const src = ref(null);
const name = ref(null);
const value = ref(null);
const selectedStatus = ref(null);
const selectedTechs = ref([]);
const Techs = ref([
  {name: 'nuxt'},
  {name: 'tailwind'},
  {name: 'laravel'},
  {name: 'vue'},
  {name: 'react'},
  {name: 'html'},
  {name: 'css'},
  {name: 'javascript'},
  {name: 'php'},
  {name: 'python'},
  {name: 'rust'},
  {name: 'angular'},
  {name: 'c'},
  {name: 'csharp'},
  {name: 'cpp'},
  {name: 'java'},
  {name: 'flutter'},
  {name: 'mysql'},
  {name: 'next'},
  {name: 'node'},
  {name: 'postgresql'},
  {name: 'typescript'},
  {name: 'go'},
  {name: 'docker'},
  {name: 'wordpress'},
  {name: 'webflow'},
  {name: 'phoenix'},
  {name: 'flask'},
  {name: 'kotlin'},
  {name: 'ror'},
  {name: 'ruby'},
  {name: 'spring'},
  {name: 'svelte'},
  {name: 'swift'},
  {name: 'elixir'},
  {name: 'django'},
  {name: 'mongodb'},
  {name: 'adonis'},
  {name: 'alpine'},
  {name: 'astro'},
  {name: 'aws'},
  {name: 'bootstrap'},
  {name: 'do'},
  {name: 'livewire'},
  {name: 'inertia'},
]);
const states = ref([
  { name: "💡 idea" },
  { name: "💻 in_progress" },
  { name: "🏆 completed" },
  { name: "🌐 live" },
  { name: "⛔ cancelled" },
  { name: "🛠️ maintenance" },
  { name: "📅 planned" },
]);
const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme

    ["clean"], // remove formatting button
  ],
};

function onFileSelect(event) {
  const file = event.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    src.value = e.target.result;
  };
  reader.readAsDataURL(file);
}
const project = reactive({
  logo: src.value,
  name: name.value,
  description: value.value,
  status: selectedStatus.value,
  tech_stack: selectedTechs.value,
  created_at: new Date(),
  updated_at: new Date(),
});

async function createProject() {
    console.log(project);
}



</script>

<template>
  <div class="flex w-full gap-2">
    <!-- Project Logo -->
    <div class="flex flex-col justify-center items-center w-1/6">
      <label for="file" class="flex items-center gap-2 text-sm font-amulya"
        >Logo</label
      >
      <img
        v-if="src"
        :src="src"
        alt="Image"
        class="shadow-md rounded-xl w-full sm:w-16 my-1"
        style="filter: grayscale(10%)"
      />
      <FileUpload
        mode="basic"
        @select="onFileSelect"
        auto
        accept="image/*"
        :maxFileSize="10000000"
      />
    </div>
    <!-- Project Name -->
    <div class="flex flex-col w-3/6">
      <label for="file" class="flex items-center gap-2 text-sm font-amulya"
        >Name</label
      >
      <input
        type="text"
        placeholder="Project Name"
        class="w-full p-2 border-2 border-gray-200 rounded-lg"
        v-model="project.name"
      />
    </div>
    <div class="w-2/6">
      <label for="file" class="flex items-center gap-2 text-sm font-amulya"
        >Status</label
      >
      <Select
        v-model="selectedStatus"
        :options="states"
        optionLabel="name"
        placeholder="Select a State"
        class="w-full"
      />
    </div>
  </div>
  <div>
    <Editor
      v-model="value"
      editorStyle="height: 120px"
      class="mt-4"
      :modules="editorModules"
    />
  </div>
  <div class="w-full mt-4">
    <MultiSelect v-model="selectedTechs" display="chip" :options="Techs" optionLabel="name" filter placeholder="Tech Stack"
    :maxSelectedLabels="3" class="w-full" />
  </div>
  <div class="mt-6">
    <BtnMain @click="createProject">Create Project</BtnMain>
  </div>
</template>

<style scoped></style>
