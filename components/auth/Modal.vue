<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const localType = ref(props.type);

watch(() => props.type, (newType) => {
  localType.value = newType;
});
</script>


<template>
  <div>
    <template v-if="localType === 'login'">
      <AuthLogin />
      <p class="mt-4">Don't have an account? 
        <span 
          class="text-indigo-500 hover:text-indigo-600 cursor-pointer"
          @click="localType = 'register'"
        >
          Register
        </span>
      </p>
    </template>
    <template v-else-if="localType === 'register'">
      <AuthRegister />
      <p class="mt-4">Already have an account? 
        <span P
          class="text-indigo-500 hover:text-indigo-600 cursor-pointer"
          @click="localType = 'login'"
        >
          Login
        </span>
      </p>
    </template>
    <AuthDemo v-else-if="localType === 'demo'" />
  </div>
</template>


<style scoped></style>