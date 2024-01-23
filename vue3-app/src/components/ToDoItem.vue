<script setup lang="ts">
import type { HandleToDosOption } from '@/compositions/todo';
import { computed, withDefaults } from 'vue';
import { HANDLE_TO_DO_TYPE } from '../../../core/constant';

interface ToDoItemProps {
  handleCheckbox: (options: HandleToDosOption) => void
  completed: boolean
  title: string
  id: number
}

const props = withDefaults(defineProps<ToDoItemProps>(), {
  handleCheckbox : () => {},
  completed: false,
  title: '',
  id: NaN
})

const itemTextClasses = computed(() => ({
  'item-text': true,
  'checked-item-text': props.completed
}))

</script>

<template>
  <li class="todo-item" @click="() => props.handleCheckbox({type: HANDLE_TO_DO_TYPE.CHECK, id: props.id})">
    <input type="checkbox" class="todo-input" :checked="props.completed"/>
    <p :class="itemTextClasses">{{title}}</p>
  </li>
</template>

<style scoped>
@import "../../../core/styles/toDoList.css";

</style>