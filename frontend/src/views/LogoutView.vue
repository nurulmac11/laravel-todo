<script setup>
import { ref } from "vue";
import {useAuthStore} from "../stores/auth";

  const authStore = useAuthStore();
  authStore.logout()
</script>

<template>
  <div class="about">
  </div>
</template>

<script>

</script>

<style>

</style>
