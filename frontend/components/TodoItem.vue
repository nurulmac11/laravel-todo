<template>
  <div>
    <p>{{ todo.title }}</p>
  </div>

</template>

<script>
const {todo} = defineProps(['todo'])
export default {
  name: "TodoItem"
}
</script>

<style scoped>

</style>
