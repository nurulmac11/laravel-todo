<script setup lang="ts">

import {useTodoStore} from "@/stores/todo";
import {storeToRefs} from "pinia";

const props = defineProps(['todo', 'key'])
const todo = props.todo;
const key = props.key;
const todoStore = useTodoStore();

todoStore.getTodos();
</script>


<template>
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">{{ todo.title }}</div>
      {{ todo.description }} - {{ todo.group_name }}
    </div>
    <span class="badge bg-primary"><button
        class="btn"
        @click="todo.completed = !todo.completed"
    >
          {{ todo.completed ? "✓" : "✗" }}
        </button></span>
  </li>
</template>

<style scoped>
.btn {
  color: white;
}
.btn:hover {
  color: red;
}
</style>
