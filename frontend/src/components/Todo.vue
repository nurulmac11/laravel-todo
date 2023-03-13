<script setup lang="ts">

import {useTodoStore} from "@/stores/todo";
import {toRefs} from "vue";

const props = defineProps(['todo'])

const {todo} = toRefs(props);

const todoStore = useTodoStore();

const completedToggle = () => {
  if (todo?.value.completed == 0) {
    todoStore.completeTodo(todo.value.id);
  } else {
    todoStore.incompleteTodo(todo?.value.id);
  }
}
const remove = () => {
  if (todo?.value) {
    todoStore.removeTodo(todo?.value.id)
  }
}
</script>


<template>
  <li class="list-group-item d-flex justify-content-between align-items-start" :key="todo.id">
    <div class="ms-2 me-auto">
      <div class="fw-bold" :class="{'todo-done': todo.completed}">{{ todo.title }}</div>
      <p>Group: {{ todo.group_name }}</p>
      <p>Priority: {{todo.priority}}</p>
      <p>Due date: {{todo.due_date}}</p>
    </div>
    <span class="badge bg-primary"><button
        class="btn"
        @click="completedToggle"
    >
          {{ todo.completed ? "✗" : "✓" }}
        </button></span>
    <span class="badge bg-primary"><button
        class="btn"
        @click="remove"
    >
          <font-awesome-icon icon="fa-solid fa-trash" />
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
