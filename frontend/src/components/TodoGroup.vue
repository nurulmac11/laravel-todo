<script setup lang="ts">

import {toRefs} from "vue";
import {useTodoGroupStore} from "@/stores/todoGroup";

const props = defineProps(['todoGroup'])

const {todoGroup} = toRefs(props);

const todoGroupStore = useTodoGroupStore();

const remove = () => {
  if (todoGroup?.value) {
    todoGroupStore.removeTodoGroup(todoGroup?.value.id)
  }
}
</script>


<template>
  <li class="list-group-item d-flex justify-content-between align-items-start" :key="todoGroup.id">
    <div class="ms-2 me-auto">
      <div class="fw-bold">{{ todoGroup.name }}</div>
    </div>
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
</style>
