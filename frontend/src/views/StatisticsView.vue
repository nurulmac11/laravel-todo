<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useStatStore} from "@/stores/stat";


const statStore = useStatStore();
const {
  todoCount, topTen, groupLT5,
  group515, groupGT15, top5Group
} = storeToRefs(statStore);
statStore.init();
</script>

<template>
  <main>
    <div>
      <p> Todo Count: {{ todoCount }} </p>
      Top 10:
      <ul>
        <li :key="user.id" v-for="user in topTen">{{ user.name }} - {{ user.total }}</li>
      </ul>
      <p> Group Count Lower Than 5:</p>
      <ul>
        <li :key="user.id" v-for="user in groupLT5">{{ user.name }} - {{ user.total }}</li>
      </ul>
      <p> Group Count Between 5-15:</p>
      <ul>
        <li :key="user.id" v-for="user in group515">{{ user.name }} - {{ user.total }}</li>
      </ul>
      <p> Group Count Greater Than 15:</p>
      <ul>
        <li :key="user.id" v-for="user in groupGT15">{{ user.name }} - {{ user.total }}</li>
      </ul>
      {{top5Group}}
    </div>
  </main>
</template>
