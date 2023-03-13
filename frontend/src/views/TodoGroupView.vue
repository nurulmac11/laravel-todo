<script setup lang="ts">

import {storeToRefs} from "pinia";
import {ref} from "vue";
import {useTodoGroupStore} from "@/stores/todoGroup";
import TodoGroup from "@/components/TodoGroup.vue";

const todoGroupStore = useTodoGroupStore();
const newTodoGroup = ref("")

todoGroupStore.getTodoGroups();

const {todoGroups} = storeToRefs(todoGroupStore);

const addTodoGroup = (todoGroup: string) => {
  todoGroupStore.addTodoGroup(todoGroup);
  newTodoGroup.value = '';
}

</script>

<template>
  <main>
    <div>
      <h1>Todo Group list</h1>
      <section class="todos">
        <div class="row g-3">
        <div class="col-11">
          <input type="text"
                 class="form-control"
                 v-model="newTodoGroup"
                 @keyup.enter="addTodoGroup(newTodoGroup)"
                 placeholder="New todo group"
          >
        </div>
        <div class="col-1">
          <button @click="addTodoGroup(newTodoGroup)"
                  class="btn btn-primary mb-3"
          >
            <i class="fa fa-plus"></i> Add
          </button>
        </div></div>
        <ol class="list-group list-group-numbered">
          <TodoGroup v-for="todoGroup in todoGroups"
                :key="todoGroup.id"
                :todoGroup="todoGroup"
          />
        </ol>
      </section>


    </div>
  </main>
</template>
