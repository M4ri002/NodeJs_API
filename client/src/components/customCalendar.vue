<script>
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import { ref } from 'vue'
const date = ref(new Date());
</script>

<template>
  <VDatePicker v-model="date" />
</template>