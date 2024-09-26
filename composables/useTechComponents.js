// composables/useTechComponents.js
import { defineAsyncComponent } from "vue";

export function useTechComponents() {
  const techComponents = {
    nuxt: defineAsyncComponent(() => import("@/components/Tech/Nuxt.vue")),
    tailwind: defineAsyncComponent(() =>
      import("@/components/Tech/Tailwind.vue")
    ),
    laravel: defineAsyncComponent(() =>
      import("@/components/Tech/Laravel.vue")
    ),
    vue: defineAsyncComponent(() => import("@/components/Tech/Vue.vue")),
    react: defineAsyncComponent(() => import("@/components/Tech/React.vue")),
    html: defineAsyncComponent(() => import("@/components/Tech/Html.vue")),
    css: defineAsyncComponent(() => import("@/components/Tech/Css.vue")),
    javascript: defineAsyncComponent(() => import("@/components/Tech/Js.vue")),
    php: defineAsyncComponent(() => import("@/components/Tech/Php.vue")),
    python: defineAsyncComponent(() => import("@/components/Tech/Python.vue")),
    rust: defineAsyncComponent(() => import("@/components/Tech/Rust.vue")),
    angular: defineAsyncComponent(() =>
      import("@/components/Tech/Angular.vue")
    ),
    c: defineAsyncComponent(() => import("@/components/Tech/C.vue")),
    csharp: defineAsyncComponent(() => import("@/components/Tech/Csharp.vue")),
    cpp: defineAsyncComponent(() => import("@/components/Tech/Cpp.vue")),
    java: defineAsyncComponent(() => import("@/components/Tech/Java.vue")),
    flutter: defineAsyncComponent(() =>
      import("@/components/Tech/Flutter.vue")
    ),
    mysql: defineAsyncComponent(() => import("@/components/Tech/Mysql.vue")),
    next: defineAsyncComponent(() => import("@/components/Tech/Next.vue")),
    node: defineAsyncComponent(() => import("@/components/Tech/Node.vue")),
    postgresql: defineAsyncComponent(() =>
      import("@/components/Tech/Postgresql.vue")
    ),
    typescript: defineAsyncComponent(() =>
      import("@/components/Tech/Typescript.vue")
    ),
    go: defineAsyncComponent(() => import("@/components/Tech/Go.vue")),
    docker: defineAsyncComponent(() => import("@/components/Tech/Docker.vue")),
    wordpress: defineAsyncComponent(() =>
      import("@/components/Tech/Wordpress.vue")
    ),
    webflow: defineAsyncComponent(() =>
      import("@/components/Tech/Webflow.vue")
    ),
    phoenix: defineAsyncComponent(() =>
      import("@/components/Tech/Phoenix.vue")
    ),
    flask: defineAsyncComponent(() => import("@/components/Tech/Flask.vue")),
    kotlin: defineAsyncComponent(() => import("@/components/Tech/Kotlin.vue")),
    ror: defineAsyncComponent(() => import("@/components/Tech/Ror.vue")),
    ruby: defineAsyncComponent(() => import("@/components/Tech/Ruby.vue")),
    spring: defineAsyncComponent(() => import("@/components/Tech/Spring.vue")),
    svelte: defineAsyncComponent(() => import("@/components/Tech/Svelte.vue")),
    swift: defineAsyncComponent(() => import("@/components/Tech/Swift.vue")),
    elixir: defineAsyncComponent(() => import("@/components/Tech/Elixir.vue")),
    django: defineAsyncComponent(() => import("@/components/Tech/Django.vue")),
    mongodb: defineAsyncComponent(() =>
      import("@/components/Tech/Mongodb.vue")
    ),
    adonis: defineAsyncComponent(() => import("@/components/Tech/Adonis.vue")),
    alpine: defineAsyncComponent(() => import("@/components/Tech/Alpine.vue")),
    astro: defineAsyncComponent(() => import("@/components/Tech/Astro.vue")),
    aws: defineAsyncComponent(() => import("@/components/Tech/Aws.vue")),
    bootstrap: defineAsyncComponent(() =>
      import("@/components/Tech/Bootstrap.vue")
    ),
    do: defineAsyncComponent(() => import("@/components/Tech/Do.vue")),
    livewire: defineAsyncComponent(() =>
      import("@/components/Tech/Livewire.vue")
    ),
    inertia: defineAsyncComponent(() =>
      import("@/components/Tech/Inertia.vue")
    ),
  };

  return { techComponents };
}
