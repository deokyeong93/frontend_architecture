<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { TO_DO_PLACEHOLDER, MOCK_USER_ID, HANDLE_TO_DO_TYPE } from '../../core/constant/index'
  import ToDoItem from './components/ToDoItem.vue';
  import { useToDo } from './compositions/todo';

  const title = ref('')
  const {fetchReadUserTodos, state: appState, handleToDos } = useToDo(MOCK_USER_ID)

  const todoItemsRef = ref<HTMLUListElement | null>(null)

  fetchReadUserTodos()

  const totalCount = computed(() => appState.todos.length)
  const checkedCount = computed(() => appState.todos.filter(todo => todo.completed).length)

  const addCheckBox = () => {
    handleToDos({type: HANDLE_TO_DO_TYPE.ADD, title: title.value})
    title.value = ''

    setTimeout(()=> todoItemsRef.value?.scrollTo({
      top: todoItemsRef.value?.scrollHeight + todoItemsRef.value?.clientHeight 
    }), 0)
  }
</script>

<template>
  <section class="container">
    <div class="todo-wrapper">
      <div class="todo-header">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        <h2>To-do list</h2>
      </div>
      <form 
        class="input-form"
        @submit.prevent="addCheckBox"
      >
        <input
          type="text"
          class="input-field"
          id="todoInput"
          :placeholder="TO_DO_PLACEHOLDER"
          v-model="title"
          :disabled="appState.loading.fetchReadUserTodos"
        />
        <button 
          class="input-btn"
          :disabled="appState.loading.fetchReadUserTodos || !title.length"
        >
          추가
        </button>
      </form>
      <div v-if="appState.loading.fetchReadUserTodos" class="todo-items">
        데이터를 불러오는 중입니다.
      </div>
      <ul v-else class="todo-items" ref="todoItemsRef">
        <div 
          v-for="todo in appState.todos" 
          :key="todo.id" 
          class="todo-item-wrapper"
        >
          <ToDoItem 
            :id="todo.id"
            :title="todo.title" 
            :completed="todo.completed"
            :handle-checkbox="handleToDos"
          />
        </div>
      </ul>
      <div>
        <hr class="counter" />
        <div class="counter-container">
          <p>
            <span>{{ checkedCount }}</span>
            <span> / </span>
            <span>{{ totalCount }}</span>
          </p>
          <button 
            @click="() => handleToDos({type: HANDLE_TO_DO_TYPE.INIT})"
            :disabled="appState.loading.fetchReadUserTodos"
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @import '../../core/styles/app.css';

</style>