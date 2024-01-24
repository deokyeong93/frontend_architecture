<template>
  <div id="app">
    <section class="container">
      <div class="todo-wrapper">
        <div class="todo-header">
          <img
            alt="Vue logo"
            class="logo"
            src="./assets/logo.svg"
            width="80"
            height="125"
          />
          <h2>To-do list - Vue2</h2>
        </div>
        <form class="input-form" @submit.prevent="addCheckBox">
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
          <div class="counter-container">
            <p>
              <span>{{ checkedCount }}</span>
              <span> / </span>
              <span>{{ totalCount }}</span>
            </p>
            <button
              @click="() => handleToDos({ type: HANDLE_TO_DO_TYPE.INIT })"
              :disabled="appState.loading.fetchReadUserTodos"
            >
              Delete All
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {
  TO_DO_PLACEHOLDER,
  MOCK_USER_ID,
  HANDLE_TO_DO_TYPE,
} from "../../core/constant/index"
import { ToDoController, type ToDo } from "../../core/service/controller/todo"
import { readUserToDos } from "../../core/service/apis/todo"

import ToDoItem from "./components/ToDoItem.vue"

export type HandleToDosOption =
  | { type: typeof HANDLE_TO_DO_TYPE.ADD; title: string }
  | { type: typeof HANDLE_TO_DO_TYPE.INIT }
  | { type: typeof HANDLE_TO_DO_TYPE.CHECK; id: number }

type Data = {
  TO_DO_PLACEHOLDER: typeof TO_DO_PLACEHOLDER
  MOCK_USER_ID: typeof MOCK_USER_ID
  HANDLE_TO_DO_TYPE: typeof HANDLE_TO_DO_TYPE

  title: string

  appState: {
    todos: ToDo[]
    loading: {
      fetchReadUserTodos: boolean
    }
  }
}

type Methods = {
  handleToDos(options: HandleToDosOption): void
  fetchReadUserTodos(): Promise<void>
  addCheckBox(): void
}

export default Vue.extend<Data, Methods, Record<string, string | number>>({
  name: "App",
  components: {
    ToDoItem,
  },
  created() {
    this.fetchReadUserTodos()
  },
  data() {
    return {
      TO_DO_PLACEHOLDER,
      MOCK_USER_ID,
      HANDLE_TO_DO_TYPE,

      title: "",

      appState: {
        todos: [],
        loading: {
          fetchReadUserTodos: false,
        },
      },
    }
  },
  computed: {
    totalCount() {
      return this.appState.todos.length
    },
    checkedCount() {
      return this.appState.todos.filter((todo: ToDo) => todo.completed).length
    },
  },
  methods: {
    // setState
    handleToDos(options: HandleToDosOption) {
      const controller = new ToDoController(this.appState.todos)

      if (options.type === HANDLE_TO_DO_TYPE.ADD) {
        this.appState.todos = controller.addToDo({
          userId: MOCK_USER_ID,
          title: options.title,
        })

        return
      }

      if (options.type === HANDLE_TO_DO_TYPE.CHECK) {
        this.appState.todos = controller.checkToDo({ id: options.id })

        return
      }

      if (options.type === HANDLE_TO_DO_TYPE.INIT) {
        this.appState.todos = controller.initToDo()
      }
    },
    // setState - API
    async fetchReadUserTodos() {
      try {
        this.appState.loading.fetchReadUserTodos = true

        const todos = await readUserToDos(MOCK_USER_ID)

        this.appState.todos = todos
        // eslint-disable-next-line no-useless-catch
      } catch (error) {
        throw error
      } finally {
        this.appState.loading.fetchReadUserTodos = false
      }
    },
    addCheckBox() {
      this.handleToDos({ type: HANDLE_TO_DO_TYPE.ADD, title: this.title })
      this.title = ""

      const toDoItemsDom = this.$refs.todoItemsRef as HTMLUListElement | null
      setTimeout(() => {
        if (toDoItemsDom) {
          toDoItemsDom?.scrollTo?.({
            top: toDoItemsDom?.scrollHeight + toDoItemsDom?.clientHeight,
          })
        }
      }, 0)
    },
  },
})
</script>

<style scoped>
@import "../../core/styles/app.css";
</style>
