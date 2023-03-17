<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useStatStore} from "@/stores/stat";


const statStore = useStatStore();
const {todoCount, topTen} = storeToRefs(statStore);
statStore.init();
</script>

<template>
  <main>
    <div>
      <p> Todo Count: {{ todoCount }} </p>
      Top 10:
      <ul>
        <li :key="user.id" v-for="user in topTen">{{user.name}} - {{user.total}}</li>
      </ul>
    </div>
  </main>
</template>
