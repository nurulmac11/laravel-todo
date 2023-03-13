<script setup lang="ts">

import {useTodoStore} from "@/stores/todo";
import {computed, ref, toRef} from "vue";

const props = defineProps(['completed', 'id', 'description', 'title', 'group_name'])

const completed = toRef(props, 'completed')
const id = toRef(props, 'id')
const description = toRef(props, 'description')
const title = toRef(props, 'title')
const group_name = toRef(props, 'group_name')


const todoStore = useTodoStore();

const completedToggle = () => {
  if (completed.value == 0) {
    todoStore.completeTodo(id.value);
  } else {
    todoStore.incompleteTodo(id.value);
  }
}
</script>


<template>
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold" :class="{'todo-done': completed}">{{ title }}</div>
      <p>{{ description }} - {{ group_name }}</p>
    </div>
    <span class="badge bg-primary"><button
        class="btn"
        @click="completedToggle"
    >
          {{ completed? "✗" : "✓" }}
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
.todo-done {
  color: red;
  text-decoration: line-through;
}
</style>
