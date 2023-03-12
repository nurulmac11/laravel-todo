<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";
const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);
</script>

<template>
  <div class="col-lg-8 mx-auto p-4 py-md-5">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Fixed navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <RouterLink to="/" active-class="active" class="nav-link">Home</RouterLink>
            </li>
            <li class="nav-item" v-if="!accessToken">
              <RouterLink to="/login" active-class="active" class="nav-link">Login</RouterLink>
            </li>
            <li class="nav-item" v-if="accessToken">
              <RouterLink to="/logout" active-class="active" class="nav-link">Logout</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container">
      <RouterView />

    </main>
    <footer class="pt-5 my-5 text-muted border-top">
      Created by the Bootstrap team &middot; &copy; 2022
    </footer>
  </div>
</template>

<style scoped>
</style>
