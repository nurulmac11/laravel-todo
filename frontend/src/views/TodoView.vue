<script setup lang="ts">

import {useTodoStore} from "@/stores/todo";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import Todo from "@/components/Todo.vue";

const todoStore = useTodoStore();
const newTodo = ref("")
todoStore.getTodos();
const {todos} = storeToRefs(todoStore);
</script>

<template>
  <main>
    <div>
      <h1>Todo list</h1>
      <section class="todos">
        <div class="row g-3">
        <div class="col-11">
          <input type="text"
                 class="form-control"
                 v-model="newTodo"
                 @keyup.enter="todoStore.addTodo(newTodo)"
                 placeholder="New task"
          >
        </div>
        <div class="col-1">
          <button @click="todoStore.addTodo(newTodo)"
                  class="btn btn-primary mb-3"
          >
            <i class="fa fa-plus"></i> Add
          </button>
        </div></div>
        <ol class="list-group list-group-numbered">
          <Todo v-for="(todo, index) in todos"
                :todo="todo"
                :key="todo.id"/>
        </ol>
      </section>


    </div>
  </main>
</template>
