<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const localType = ref(props.type); // Keep a local copy of the prop to switch between types

watch(() => props.type, (newType) => {
  localType.value = newType;
});
</script>


<template>
  <div>
    <component :is="localType" v-if="localType === 'login'">
      <AuthLogin />
      <p class="mt-4">Don't have an account? 
        <span 
          class="text-indigo-500 hover:text-indigo-600 cursor-pointer"
          @click="localType = 'register'"
        >
          Register
        </span>
      </p>
    </component>

    <component :is="localType" v-else-if="type === 'register'">
      <AuthRegister />
      <p class="mt-4">Already have an account? 
        <span 
          class="text-indigo-500 hover:text-indigo-600 cursor-pointer"
          @click="localType = 'login'"
        >
          Login
        </span>
      </p>
    </component>
    
    <component :is="localType" v-else-if="type === 'demo'">
      <AuthDemo />
    </component>
  </div>
</template>


<style scoped></style>