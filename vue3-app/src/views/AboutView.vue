<template>
  <div class="about">
    <h1>core 갖고오기</h1>
    <div>
      {{ ex }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { dateAdapter } from '../../../core/lib/date-lib/adapter';

const ex = dateAdapter.dayjs.addDate({year: 3})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
