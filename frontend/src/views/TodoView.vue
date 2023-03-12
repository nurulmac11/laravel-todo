<script setup lang="ts">

import {useTodoStore} from "@/stores/todo";
import {storeToRefs} from "pinia";
import checked from '@/components/icons/checked.vue';
import cross from '@/components/icons/cross.vue';

const todoStore = useTodoStore();

todoStore.getTodos();
const { todos } = storeToRefs(todoStore);
</script>

<template>
  <main>
    <div>
      <h1>Todo list</h1>
      <p>Todo</p>
      <li v-for="todo in todos">
        <p>{{ todo.name }} - <checked v-if="todo.completed" /> <cross v-if="!todo.completed" /></p>
      </li>
    </div>
  </main>
</template>
