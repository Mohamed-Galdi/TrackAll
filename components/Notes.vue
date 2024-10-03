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

const noteTitle = ref("");
const noteContent = ref("");
const addNoteDialog = ref(false);
const isSubmitting = ref(false);
const notes = ref([]);

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const canAddNote = computed(() => {
  return user.value && props.project.user_id === user.value.id;
});

onMounted(() => {
  fetchNotes();
});

const loading = ref(true);
const fetchNotes = async () => {
  try {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("project_id", props.project.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    notes.value = data;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error fetching notes: " + error.message,
      life: 3000,
    });
  } finally {
    loading.value = false;
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

const openAddNoteDialog = () => {
  if (!canAddNote.value) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "You do not have permission to add notes to this project",
      life: 3000,
    });
    return;
  }
  addNoteDialog.value = true;
};

const createNote = async () => {
  if (noteTitle.value.trim() === "") {
    toast.add({
      severity: "warn",
      summary: "Warning",
      detail: "Note title cannot be empty",
      life: 3000,
    });
    return;
  } else if (noteContent.value.trim() === "") {
    toast.add({
      severity: "warn",
      summary: "Warning",
      detail: "Note content cannot be empty",
      life: 3000,
    });
    return;
  }

  if (!canAddNote.value) {
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
      .from("notes")
      .insert({
        project_id: props.project.id,
        title: noteTitle.value.trim(),
        content: noteContent.value.trim(),
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) throw error;

    await updateProjectTimestamp();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Note created successfully",
      life: 3000,
    });
    noteTitle.value = "";
    noteContent.value = "";
    addNoteDialog.value = false;
    await fetchNotes();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error creating note: " + error.message,
      life: 3000,
    });
  } finally {
    isSubmitting.value = false;
  }
};

const noteDetailsDialog = ref(false);
const noteDetails = ref({});
const limitedTitle = ref("");
const showNoteDetails = (note) => {
  noteDetails.value = note;
  limitedTitle.value = useTextLimit(note.title, 30);
  noteDetailsDialog.value = true;
};

// Delete note function and dialog
const confirm = useConfirm();
const deleteNote = (note) => {
  confirm.require({
    message: "Are you sure you want to delete this note?",
    header: "Delete Note",
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
          .from("notes")
          .delete()
          .eq("id", note.id);

        if (error) throw error;

        await updateProjectTimestamp();
        await fetchNotes();

        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Note deleted successfully",
          life: 3000,
        });
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error deleting note: " + error.message,
          life: 3000,
        });
      }
    },
    reject: () => {
      // Optional: Handle the reject case
      toast.add({
        severity: "info",
        summary: "Cancelled",
        detail: "Note deletion cancelled",
        life: 3000,
      });
    },
  });
};
</script>

<template>
  <div class="bg-white p-6 rounded-lg border border-gray-300 shadow-sm overflow-x-scroll">
    <div class="flex justify-between items-center gap-4 mb-4">
      <p class="text-xl font-semibold">Notes</p>
      <button
        @click="openAddNoteDialog"
        class="flex justify-center items-center gap-2 p-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-200"
        :disabled="!canAddNote"
      >
        <p class="md:text-base text-sm">Add Note</p>
        <IconsAddTask class="w-4 h-4" />
      </button>
    </div>

    <!-- Notes List -->
    <div v-if="loading" class="w-full">
      <NotesSkeleton />
    </div>
    <div v-else class="space-y-4">
      <div v-if="notes.length > 0">
        <ul class="grid md:grid-cols-3 grid-cols-1 gap-4 mt-4 ">
          <li
            v-for="note in notes"
            :key="note.id"
            class="flex items-center gap-2 bg-slate-100 p-2 rounded text-slate-600 border border-slate-300 h-44 shadow-sm overflow-x-scroll"
          >
            <div
              @click="showNoteDetails(note)"
              class="w-full flex flex-col justify-between cursor-pointer h-full"
            >
              <div>
                <h2
                  class="text-nowrap truncate line-clamp-1 text-2xl font-amulya"
                >
                  {{ useTextLimit(note.title, 20) }}
                </h2>
                <div class="h-[1px] w-full bg-slate-200"></div>
              </div>

              <div
                class="flex flex-col justify-start items-stretch h-full p-1"
              >
                <p class="line-clamp-4 text-sm">
                  {{ useTextLimit(note.content, 250) }}
                </p>
              </div>
              <div>
                <div class="h-[1px] w-full bg-slate-200 mt-2"></div>
                <p class="text-xs font-semibold text-slate-600 m-1">
                  {{ useHumanReadableDate(note.created_at) }}
                </p>
              </div>
            </div>
            <div class="h-full">
              <button
                @click="deleteNote(note)"
                class="text-slate-500 hover:text-red-400 transition-all duration-300 ease-in-out"
              >
                <IconsX class="w-4 h-4" />
              </button>
            </div>
          </li>
        </ul>
      </div>

      <p v-if="notes.length === 0" class="text-gray-500 italic">
        No notes on this project
      </p>
    </div>
  </div>

  <!-- Note Details Dialog -->
  <Dialog
    v-model:visible="noteDetailsDialog"
    modal
    :header="limitedTitle"
    :style="{ width: '90%', maxWidth: '600px', backgroundColor: '#f5f5f5' }"
    class=""
  >
    <div class="space-y-3">
      <div class="bg-slate-200 p-2 rounded-md">
        <p class="text-sm font-semibold">
          {{ noteDetails.content }}
        </p>
      </div>
      <div class="flex justify-start items-center gap-2 w-full ms-1">
        <p class="text-xs text-slate-500 font-semibold">Created:</p>
        <div class="flex gap-1 items-center">
          <p class="text-xs font-semibold">
            {{ useFormattedDate(noteDetails.created_at) }}
          </p>
          <p class="text-xs font-semibold">
            ({{ useHumanReadableDate(noteDetails.created_at) }})
          </p>
        </div>
      </div>
    </div>
  </Dialog>

  <!-- Add Note Dialog -->
  <Dialog
    v-model:visible="addNoteDialog"
    modal
    header="Add a note to This Project"
    :style="{ width: '90%', maxWidth: '500px', backgroundColor: '#f5f5f5' }"
  >
    <div class="space-y-4">
      <InputText
        autofocus
        type="text"
        v-model="noteTitle"
        class="w-full p-2 border rounded"
        placeholder="Note title"
        @keyup.enter="createNote"
      />
      <Textarea v-model="noteContent" placeholder="Note content" rows="3" cols="30" class="w-full" />
      <button
        @click="createNote"
        class="w-full text-center text-white bg-indigo-500 hover:bg-indigo-600 rounded-md py-2 px-4 transition-colors duration-200"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? "Adding Note..." : "Add Note" }}
      </button>
    </div>
  </Dialog>
</template>
