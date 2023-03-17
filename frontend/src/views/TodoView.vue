<script setup lang="ts">

import {useTodoStore} from "@/stores/todo";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import Todo from "@/components/Todo.vue";
import {useTodoGroupStore} from "@/stores/todoGroup";
import PrioritySelector from "@/components/PrioritySelector.vue";
import TodoGroup from "@/components/TodoGroup.vue";
import TodoGroupSelector from "@/components/TodoGroupSelector.vue";

const todoStore = useTodoStore();
const todoGroupStore = useTodoGroupStore();

// Initialize todos, priorities, todo groups
todoStore.getTodos();
todoStore.getPriorities();
todoGroupStore.getTodoGroups();

// retrieve via ref required variables
const {defaultPriority, filteredTodos} = storeToRefs(todoStore);
const {firstTodoId} = storeToRefs(todoGroupStore);

const newTodo = ref("")
const newTodoGroup = ref(firstTodoId);
const newPriority = ref(defaultPriority)
const date = ref("");

// Filters
const completedFilter = ref(true);
const priorityFilter = ref(0);
const groupFilter = ref(0);

const addTodo = (todo: string, todoGroup: number, priority: number, date: any) => {
  todoStore.addTodo(todo, todoGroup, priority, date);
  newTodo.value = '';
}

const completedFilterChange = () => {
  todoStore.addFilter('completed', completedFilter);
}
const priorityFilterChange = (val: any) => {
  todoStore.addFilter('priority', val);
}

const groupFilterChange = () => {
  todoStore.addFilter('group', groupFilter);
}

</script>

<template>
  <main>
    <div>
      <h1>Todo list</h1>
      <section class="todos">
        <div class="row g-3">
          <div class="col-4">
            <div class="form-check">
              <input
                  @change="completedFilterChange"
                  v-model="completedFilter"
                  class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Filter completed todos
              </label>
            </div>
          </div>
        </div>

        <div class="row g-3 mt-1">
          <div class="col-4">
            <PrioritySelector
                v-model="priorityFilter"
                @update:modelValue="priorityFilterChange"
            />
          </div>
        </div>

        <div class="row g-3 mt-1">
          <div class="col-4">
            <TodoGroupSelector
                v-model="groupFilter"
                @update:modelValue="groupFilterChange"
            />
          </div>
        </div>
        <hr/>

        <div class="row g-3 mt-1">
          <div class="col-4">
            <input type="text"
                   class="form-control"
                   v-model="newTodo"
                   @keyup.enter="addTodo(newTodo, newTodoGroup, newPriority, date)"
                   placeholder="New todo"
            >
          </div>
          <div class="col-3">
            <PrioritySelector
                v-model="newPriority"
            />
          </div>
          <div class="col-3">
            <TodoGroupSelector
              v-model="newTodoGroup"
              />
          </div>
        </div>
        <div class="row g-3 mt-1">
          <div class="col-4">
            <VueDatePicker v-model="date" placeholder="Select due date" :enable-time-picker="false"
                           :min-date="new Date()" model-type="yyyy-MM-dd" auto-apply/>
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
          <Todo v-for="todo in filteredTodos"
                :key="todo.id"
                :todo="todo"
          />
        </ol>
      </section>


    </div>
  </main>
</template>
