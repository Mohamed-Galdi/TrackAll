<script setup>
import { ref, computed, onMounted } from "vue";
import Dialog from "primevue/dialog";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const toast = useToast();

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const taskContent = ref("");
const addTaskDialog = ref(false);
const isSubmitting = ref(false);
const tasks = ref([]);

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const canAddTask = computed(() => {
  return user.value && props.project.user_id === user.value.id;
});

const openTasks = computed(() => tasks.value.filter((task) => !task.closed_at));
const closedTasks = computed(() =>
  tasks.value.filter((task) => task.closed_at)
);

onMounted(() => {
  fetchTasks();
});

const fetchTasks = async () => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", props.project.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    tasks.value = data;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error fetching tasks: " + error.message,
      life: 3000,
    });
  }
};

const updateProjectTimestamp = async () => {
  try {
    const { error } = await supabase
      .from("projects")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", props.project.id);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating project timestamp:", error);
  }
};

const openAddTaskDialog = () => {
  if (!canAddTask.value) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "You do not have permission to add tasks to this project",
      life: 3000,
    });
    return;
  }
  addTaskDialog.value = true;
};

const createTask = async () => {
  if (taskContent.value.trim() === "") {
    toast.add({
      severity: "warn",
      summary: "Warning",
      detail: "Task content cannot be empty",
      life: 3000,
    });
    return;
  }

  if (!canAddTask.value) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Unauthorized",
      life: 3000,
    });
    return;
  }

  isSubmitting.value = true;

  try {
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        project_id: props.project.id,
        content: taskContent.value.trim(),
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) throw error;

    await updateProjectTimestamp();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Task created successfully",
      life: 3000,
    });
    taskContent.value = "";
    addTaskDialog.value = false;
    await fetchTasks();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error creating task: " + error.message,
      life: 3000,
    });
  } finally {
    isSubmitting.value = false;
  }
};

const toggleTaskStatus = async (task , event) => {
  try {
    const updatedTask = {
      ...task,
      closed_at: task.closed_at ? null : new Date().toISOString(),
    };

    const { error } = await supabase
      .from("tasks")
      .update(updatedTask)
      .eq("id", task.id);

    if (error) throw error;

    await updateProjectTimestamp();
    await fetchTasks();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: `Task ${task.closed_at ? "reopened" : "marked as done"}`,
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error updating task: " + error.message,
      life: 3000,
    });
  }
};

const taskDetailsDialog = ref(false);
const taskDetails = ref({});
const showTaskDetails = (task) => {
  console.log("task details", task);
  taskDetails.value = task;
  taskDetailsDialog.value = true;
};

// Delete task function and dialog
const confirm = useConfirm();
const deleteTask = (task) => {
  confirm.require({
    message: "Are you sure you want to delete this task?",
    header: "Delete Task",
    icon: "pi pi-exclamation-triangle",
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
      try {
        const { error } = await supabase
          .from("tasks")
          .delete()
          .eq("id", task.id);

        if (error) throw error;

        await updateProjectTimestamp();
        await fetchTasks();

        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Task deleted successfully",
          life: 3000,
        });
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error deleting task: " + error.message,
          life: 3000,
        });
      }
    },
    reject: () => {
      // Optional: Handle the reject case
      toast.add({
        severity: "info",
        summary: "Cancelled",
        detail: "Task deletion cancelled",
        life: 3000,
      });
    },
  });
};
</script>

<template>
  <div class="bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
    <div class="flex justify-between items-center gap-4 mb-4">
      <p class="text-xl font-semibold">Tasks</p>
      <button
        @click="openAddTaskDialog"
        class="flex justify-center items-center gap-2 p-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-200"
        :disabled="!canAddTask"
      >
        <p>Add Task</p>
        <IconsAddTask class="w-4 h-4" />
      </button>
    </div>

    <div class="space-y-4">
      <div v-if="openTasks.length > 0">
        <h3 class="font-semibold mb-2">Open Tasks</h3>
        <ul class="space-y-2">
          <li
           
            v-for="task in openTasks"
            :key="task.id"
            class="flex items-center gap-2 bg-indigo-400 p-2 rounded text-slate-100"
          >
            <input
              type="checkbox"
              :checked="false"
              
              @change="toggleTaskStatus(task, event)"
              class="form-checkbox h-5 w-5 text-indigo-600"
            />
            <div  @click="showTaskDetails(task)" class=" w-full cursor-pointer">
                <p class="text-nowrap truncate line-clamp-1">{{
                  useTextLimit(task.content, 80)
                }}</p>
            </div>
            <button
              @click="deleteTask(task)"
              class="ml-auto text-red-50 hover:text-red-400 transition-all duration-300 ease-in-out"
            >
              <IconsX class="w-4 h-4" />
            </button>
          </li>
        </ul>
      </div>

      <div v-if="closedTasks.length > 0">
        <h3 class="font-semibold mb-2">Completed Tasks</h3>
        <ul class="space-y-2">
          <li  
            v-for="task in closedTasks"
            :key="task.id"
            class="flex items-center gap-2 bg-gray-300 p-2 rounded text-slate-800"
          >
            <input
              type="checkbox"
              :checked="true"
              @change="toggleTaskStatus(task)"
              class="form-checkbox h-5 w-5 text-indigo-600"
            />
           <div @click="showTaskDetails(task)" class=" w-full cursor-pointer">
                <p class="line-through text-nowrap truncate line-clamp-1">{{
                  useTextLimit(task.content, 80)
                }}</p>
           </div>
            <button
              @click="deleteTask(task)"
              class="ml-auto text-gray-500 hover:text-red-500 transition-all duration-300 ease-in-out"
            >
              <IconsX class="w-4 h-4" />
            </button>
          </li>
        </ul>
      </div>

      <p v-if="tasks.length === 0" class="text-gray-500 italic">No tasks yet</p>
    </div>
  </div>

  <!-- Task Details Dialog -->
  <Dialog
    v-model:visible="taskDetailsDialog"
    modal
    header="Task Details"
    :style="{ width: '90%', maxWidth: '600px', backgroundColor: '#f5f5f5' }"
    class=""
  >
    <div class="space-y-4">
      <p class="text-sm font-semibold ms-1"
        :class="{
          'text-red-500': taskDetails.closed_at,
          'text-green-600': !taskDetails.closed_at,
        }">
        {{ taskDetails.closed_at ? "Closed" : "Open" }}
      </p>
      <div class="bg-slate-200 p-2 rounded-md">
        <p class="text-sm font-semibold line-clamp-4">
          {{ taskDetails.content }}
        </p>
      </div>
      <div class="flex justify-start items-center gap-4 w-full ms-1">
        <p class="text-sm font-semibold">Created: </p>
        <p class="text-sm font-semibold">{{ useFormattedDate(taskDetails.created_at) }} </p>
        <p class="text-sm font-semibold">({{ useHumanReadableDate(taskDetails.created_at) }}) </p>
      </div>
      <div class="flex justify-start items-center gap-4 w-full ms-1">
        <p class="text-sm font-semibold">Closed: </p>
        
        <div v-if="taskDetails.closed_at" class="flex justify-start items-center gap-4 w-full">
            <p class="text-sm font-semibold" >{{ useFormattedDate(taskDetails.closed_at) }} </p>
            <p class="text-sm font-semibold">({{ useHumanReadableDate(taskDetails.closed_at) }}) </p>
        </div>
        <div v-else>
            <p class="text-sm font-semibold">No Closed Yet</p>
        </div>
      </div>
      
    </div>
  </Dialog>

  <!-- Add Task Dialog -->
  <Dialog
    v-model:visible="addTaskDialog"
    modal
    header="Add a task to This Project"
    :style="{ width: '90%', maxWidth: '500px', backgroundColor: '#f5f5f5' }"
  >
    <div class="space-y-4">
      <InputText
        autofocus
        type="text"
        v-model="taskContent"
        class="w-full p-2 border rounded"
        placeholder="Enter task description"
        @keyup.enter="createTask"
      />
      <button
        @click="createTask"
        class="w-full text-center text-white bg-indigo-500 hover:bg-indigo-600 rounded-md py-2 px-4 transition-colors duration-200"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? "Adding Task..." : "Add Task" }}
      </button>
    </div>
  </Dialog>
</template>
