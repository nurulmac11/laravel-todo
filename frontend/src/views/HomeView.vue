<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {useAuthStore} from "@/stores/auth";


const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

</script>

<template>
  <main>
    <div v-if="user">
      <h1>Hi {{user.name }}!</h1>
      <p>You're logged in with Vue 3 + Pinia & JWT!!</p>
    </div>
  </main>
</template>
