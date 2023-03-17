<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {useStatStore} from "@/stores/stat";


const statStore = useStatStore();
const { todoCount } = storeToRefs(statStore);
statStore.getTodoCount();
</script>

<template>
  <main>
    <div>
      <p>
        Todo Count: {{todoCount}}
      </p>
    </div>
  </main>
</template>
