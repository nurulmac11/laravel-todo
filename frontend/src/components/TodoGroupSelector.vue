<script setup>
import {storeToRefs} from "pinia";
import {useTodoGroupStore} from "@/stores/todoGroup";

defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const todoGroupStore = useTodoGroupStore();
const {todoGroups} = storeToRefs(todoGroupStore);

</script>

<template>
  <select @input="$emit('update:modelValue', $event.target.value)" :value="modelValue" class="form-select" aria-label="Priority filter">
    <option value="0">Select group</option>
    <option :key="index" :value="todoGroup.id" v-for="(todoGroup, index) in todoGroups">{{ todoGroup.name }}</option>
  </select>
</template>