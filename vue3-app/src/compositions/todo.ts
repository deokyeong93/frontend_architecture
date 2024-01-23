import { reactive } from 'vue';
import { readUserToDos } from '../../../core/service/apis/todo';
import { HANDLE_TO_DO_TYPE } from '../../../core/constant';
import { ToDoController, type ToDo } from '../../../core/service/domains/todo';

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
    const controller = new ToDoController(state.todos)
    
    if(options.type === HANDLE_TO_DO_TYPE.ADD) {
      state.todos = controller.addToDo({
        userId,
        title: options.title,
      })

      return
    }

    if(options.type === HANDLE_TO_DO_TYPE.CHECK) {
      state.todos = controller.checkToDo({id: options.id})

      return
    }

    if(options.type === HANDLE_TO_DO_TYPE.INIT) {
      state.todos = controller.initToDo()
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