import { reactive } from 'vue';
import { readUserToDos } from '../../../core/service/apis/todo';
import { HANDLE_TO_DO_TYPE } from '../../../core/constant';

type ToDo = {
  userId: number, 
  id: number, 
  title: string, 
  completed: boolean
}

type State = {
  todos: ToDo[]
  loading: {
    fetchReadUserTodos : boolean
  }
}

export type HandleToDosOption = 
  {type: typeof HANDLE_TO_DO_TYPE.ADD, title: string} | 
  {type: typeof HANDLE_TO_DO_TYPE.INIT} | 
  {type: typeof HANDLE_TO_DO_TYPE.CHECK, id: number}


export const useToDo = (userId: number) => {
  const state = reactive<State>({
    todos: [], 
    loading: {
      fetchReadUserTodos: false
    }
  }
)    

  const handleToDos = (options: HandleToDosOption) => {
    if(options.type === HANDLE_TO_DO_TYPE.ADD) {
      state.todos.push({
        id: state.todos.length + 1,
        userId,
        title: options.title,
        completed: false
      })

      return
    }

    if(options.type === HANDLE_TO_DO_TYPE.INIT) {
      state.todos.splice(0, state.todos.length)

      return
    }

    if(options.type === HANDLE_TO_DO_TYPE.CHECK) {
      const targetIndex = state.todos.findIndex(todo => todo.id === options.id)
      
      if(targetIndex > -1) {
        state.todos.splice(
          targetIndex, 
          1, 
          {
            ...state.todos[targetIndex], 
            completed: !state.todos[targetIndex].completed
          }
        )
      }
    }
  }

  const fetchReadUserTodos = async () => {
    
    try {
      state.loading.fetchReadUserTodos = true

      const todos = await readUserToDos(userId)

      state.todos = todos
    } catch(error) {
      throw error
    } finally {
      state.loading.fetchReadUserTodos = false
    }
  }

  return {state, handleToDos, fetchReadUserTodos}
}