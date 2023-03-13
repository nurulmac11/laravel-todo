<script setup lang="ts">

import {useTodoStore} from "@/stores/todo";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import Todo from "@/components/Todo.vue";
import {useTodoGroupStore} from "@/stores/todoGroup";

const todoStore = useTodoStore();
const todoGroupStore = useTodoGroupStore();

// Initialize todos, priorities, todo groups
todoStore.getTodos();
todoStore.getPriorities();
todoGroupStore.getTodoGroups();

// retrieve via ref required variables
const {todos, priorities, defaultPriority} = storeToRefs(todoStore);
const {todoGroups, firstTodoId} = storeToRefs(todoGroupStore);

const newTodo = ref("")
const newTodoGroup = ref(firstTodoId);
const newPriority = ref(defaultPriority)
const date = ref("");

const addTodo = (todo: string, todoGroup: number, priority: number, date: any) => {
  console.log(date,'xd', typeof(date))
  todoStore.addTodo(todo, todoGroup, priority, date);
  newTodo.value = '';
}

</script>

<template>
  <main>
    <div>
      <h1>Todo list</h1>
      <section class="todos">
        <div class="row g-3">
          <div class="col-4">
            <input type="text"
                   class="form-control"
                   v-model="newTodo"
                   @keyup.enter="addTodo(newTodo, newTodoGroup, newPriority, date)"
                   placeholder="New todo"
            >
          </div>
          <div class="col-3">
            <select v-model="newPriority" class="form-select" aria-label="Select priority">
              <option :value="key" v-for="(priority, key) in priorities">{{ priority }}</option>
            </select>
          </div>
          <div class="col-3">
            <select v-model="newTodoGroup" class="form-select" aria-label="Select group">
              <option :value="todoGroup.id" v-for="(todoGroup, index) in todoGroups">{{ todoGroup.name}}</option>
            </select>
          </div>
        </div>
          <div class="row g-3">
            <div class="col-4">
              <VueDatePicker v-model="date" placeholder="Select due date" :enable-time-picker="false" :min-date="new Date()"  model-type="yyyy-MM-dd" auto-apply/>
            </div>
          <div class="col-1">
            <button @click="addTodo(newTodo, newTodoGroup, newPriority, date)"
                    class="btn btn-primary mb-3"
            >
              <i class="fa fa-plus"></i> Add
            </button>
          </div>

        </div>
        <ol class="list-group list-group-numbered">
          <Todo v-for="todo in todos"
                :key="todo.id"
                :todo="todo"
          />
        </ol>
      </section>


    </div>
  </main>
</template>
