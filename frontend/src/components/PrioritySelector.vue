<script setup>
import {useTodoStore} from "@/stores/todo";
import {storeToRefs} from "pinia";

defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const todoStore = useTodoStore();
todoStore.getPriorities();
const {priorities} = storeToRefs(todoStore);

</script>

<template>
  <select @input="$emit('update:modelValue', $event.target.value)" :value="modelValue" class="form-select" aria-label="Priority filter">
    <option value="0">Select priority</option>
    <option :key="key" :value="key" v-for="(priority, key) in priorities">{{ priority }}</option>
  </select>
</template>