// ~/composables/useTechs.js
import { ref } from "vue";

export const useTechs = () => {
  const techs = ref([
    { name: "adonis" },
    { name: "alpine" },
    { name: "angular" },
    { name: "astro" },
    { name: "aws" },
    { name: "bootstrap" },
    { name: "c" },
    { name: "cpp" },
    { name: "csharp" },
    { name: "css" },
    { name: "django" },
    { name: "do" },
    { name: "docker" },
    { name: "elixir" },
    { name: "filament" },
    { name: "firebase" },
    { name: "flask" },
    { name: "flutter" },
    { name: "framer" },
    { name: "go" },
    { name: "htmx" },
    { name: "html" },
    { name: "inertia" },
    { name: "java" },
    { name: "javascript" },
    { name: "kotlin" },
    { name: "laravel" },
    { name: "livewire" },
    { name: "mongodb" },
    { name: "mysql" },
    { name: "next" },
    { name: "node" },
    { name: "nuxt" },
    { name: "phoenix" },
    { name: "php" },
    { name: "postgresql" },
    { name: "python" },
    { name: "react" },
    { name: "ror" },
    { name: "ruby" },
    { name: "rust" },
    { name: "spring" },
    { name: "supabase" },
    { name: "svelte" },
    { name: "swift" },
    { name: "tailwind" },
    { name: "typescript" },
    { name: "vue" },
    { name: "webflow" },
    { name: "wordpress" },
  ]);

  // Sort techs alphabetically
  return techs.value.sort((a, b) => a.name.localeCompare(b.name));
  
 
};
