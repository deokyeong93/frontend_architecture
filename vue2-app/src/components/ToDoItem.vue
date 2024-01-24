<template>
  <li
    class="todo-item"
    @click="
      () =>
        $props.handleCheckbox({
          type: HANDLE_TO_DO_TYPE.CHECK,
          id: $props.id,
        })
    "
  >
    <input type="checkbox" class="todo-input" :checked="$props.completed" />
    <p :class="itemTextClasses">{{ title }}</p>
  </li>
</template>

<script lang="ts">
import Vue, { PropType } from "vue"
import { HANDLE_TO_DO_TYPE } from "../../../core/constant"
import { HandleToDosOption } from "@/App.vue"

interface ToDoItemProps {
  handleCheckbox: (options: HandleToDosOption) => void
  completed: boolean
  title: string
  id: number
}

export default Vue.extend({
  props: {
    handleCheckbox: {
      type: Function as PropType<ToDoItemProps["handleCheckbox"]>,
      default: () => undefined,
    },
    completed: {
      type: Boolean as PropType<ToDoItemProps["completed"]>,
      default: false,
    },
    title: {
      type: String as PropType<ToDoItemProps["title"]>,
      default: "",
    },
    id: {
      type: Number as PropType<ToDoItemProps["id"]>,
      default: NaN,
    },
  },
  data() {
    return {
      HANDLE_TO_DO_TYPE,
    }
  },
  computed: {
    itemTextClasses(): Record<string, boolean> {
      return {
        "item-text": true,
        "checked-item-text": this.$props.completed,
      }
    },
  },
})
</script>

<style scoped>
@import "../../../core/styles/toDoItem.css";
</style>
