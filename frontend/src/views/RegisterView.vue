<script setup>
import { ref } from "vue";
import {useAuthStore} from "../stores/auth";

const name = ref("");
const email = ref("");
const password = ref("");
async function onSubmit(e) {
  e.preventDefault();
  const authStore = useAuthStore();
  await authStore.register(name.value, email.value, password.value);
}
</script>

<template>
  <div>
    <h1>This is register page</h1>
    <form @submit="onSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input @input="$emit('update:name', $event.target.value)" v-model="name" type="text" class="form-control">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input @input="$emit('update:email', $event.target.value)" v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input @input="$emit('update:password', $event.target.value)" v-model="password" type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>

</script>

<style>

</style>
