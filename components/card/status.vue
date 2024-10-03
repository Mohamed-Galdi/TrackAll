<script setup>
const props = defineProps({
  type: String,
});

const types = {
  idea: {
    label: "Idea",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-400",
    darkBg: "bg-yellow-900",
    darkText: "text-yellow-300",
    emoji: "💡",
  },
  in_progress: {
    label: "In Progress",
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-400",
    darkBg: "bg-blue-900",
    darkText: "text-blue-300",
    emoji: "💻",
  },
  completed: {
    label: "Completed",
    bg: "bg-purple-100", // Updated color to give a more satisfying completion feel
    text: "text-purple-800",
    border: "border-purple-400",
    darkBg: "bg-purple-900",
    darkText: "text-purple-300",
    emoji: "🏆", // Represents achievement or success
  },
  live: {
    label: "Live",
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-400",
    darkBg: "bg-green-900",
    darkText: "text-green-300",
    emoji: "🌐",
  },
  needs_update: {
    label: "Needs Update",
    bg: "bg-cyan-100",
    text: "text-cyan-800",
    border: "border-cyan-400",
    darkBg: "bg-cyan-900",
    darkText: "text-cyan-300",
    emoji: "📝", // Represents a document or a note
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-400",
    darkBg: "bg-red-900",
    darkText: "text-red-300",
    emoji: "⛔", // A clearer cancellation symbol
  },
  maintenance: {
    label: "Maintenance",
    bg: "bg-orange-100",
    text: "text-orange-800",
    border: "border-orange-400",
    darkBg: "bg-orange-900",
    darkText: "text-orange-300",
    emoji: "🛠️", // Tool emoji for maintenance
  },
  planned: {
    label: "Planned",
    bg: "bg-teal-100",
    text: "text-teal-800",
    border: "border-teal-400",
    darkBg: "bg-teal-900",
    darkText: "text-teal-300",
    emoji: "📅", // Calendar emoji for planned events
  },
};


// Dynamically select the current type based on the prop
const currentType = types[props.type] || types.idea; // Default to 'idea' if type is not provided
</script>

<template>
  <div
    :class="`inline-flex gap-2 items-center ${currentType.bg} ${currentType.text} border ${currentType.border} text-xs font-medium px-2.5 py-0.5 rounded-full dark:${currentType.darkBg} dark:${currentType.darkText}`"
  >
    <!-- //////////////////////// -->
    <span
      class="flex size-2 items-center justify-center rounded-full "
      :class="currentType.darkBg"
      aria-label="notification"
    >
      <span
        class="size-2 animate-ping rounded-full motion-reduce:animate-none "
        :class="currentType.darkBg"
      ></span>
    </span>
    <!-- //////////////////////// -->
    <p>{{ currentType.label }}</p>
    <p>{{ currentType.emoji }}</p>
  </div>
</template>
