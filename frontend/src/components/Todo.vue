<script setup lang="ts">

import {useTodoStore} from "@/stores/todo";
import {toRefs, ref} from "vue";
import TodoGroupSelector from "@/components/TodoGroupSelector.vue";
import PrioritySelector from "@/components/PrioritySelector.vue";

const props = defineProps(['todo'])

const {todo} = toRefs(props);

const todoStore = useTodoStore();

const editFlag = ref(false);
const editTodo = ref(todo?.value.title);
const editGroup = ref(todo?.value.todo_group_id);
const editPriority = ref(todo?.value.priority);
const editDueDate = ref(todo?.value.due_date);
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

const edit = () => {
  // Update if we are saving
  if (editFlag.value) {
    todoStore.updateTodo(todo?.value.id, editTodo.value, editGroup.value, editPriority.value, editDueDate.value);
  }

  editFlag.value = !editFlag.value;
}
</script>


<template>
  <li class="list-group-item d-flex justify-content-between align-items-start" :key="todo.id">
    <div class="ms-2 me-auto">
      <div v-if="!editFlag">
        <div class="fw-bold" :class="{'todo-done': todo.completed}">{{ todo.title }}</div>
        <p>Group: {{ todo.group_name }}</p>
        <p>Priority: {{ todo.priority_string }}</p>
        <p>Due date: {{ todo.due_date }}</p>
      </div>
      <div v-else>
        <input v-model="editTodo" type="text" class="form-control" />
        <TodoGroupSelector
            v-model="editGroup"
        />
        <PrioritySelector
            v-model="editPriority"
        />
        <VueDatePicker v-model="editDueDate" placeholder="Select due date" :enable-time-picker="false"
                       :min-date="new Date()" model-type="yyyy-MM-dd" auto-apply/>
      </div>

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
          <font-awesome-icon icon="fa-solid fa-trash"/>
        </button>
    </span>
    <span class="badge bg-primary"><button
        class="btn"
        @click="edit"
    >
          <font-awesome-icon icon="fa-solid fa-pencil" v-if="!editFlag"/>
          <font-awesome-icon icon="fa-solid fa-floppy-disk" v-else/>
        </button>
    </span>
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
