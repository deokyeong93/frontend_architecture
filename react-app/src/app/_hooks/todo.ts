import { readUserToDos } from "../../../../core/service/apis/todo"
import { HANDLE_TO_DO_TYPE } from "../../../../core/constant"
import {
  ToDoController,
  type ToDo,
} from "../../../../core/service/controller/todo"
import { useState } from "react"

export type HandleToDosOption =
  | { type: typeof HANDLE_TO_DO_TYPE.ADD; title: string }
  | { type: typeof HANDLE_TO_DO_TYPE.INIT }
  | { type: typeof HANDLE_TO_DO_TYPE.CHECK; id: number }

export const useToDo = (userId: number) => {
  const [todos, setTodos] = useState<ToDo[]>([])
  const [fetchReadUserTodosLoading, setFetchReadUserTodosLoading] =
    useState(false)

  const handleToDos = (options: HandleToDosOption) => {
    const controller = new ToDoController(todos)

    if (options.type === HANDLE_TO_DO_TYPE.ADD) {
      setTodos(
        controller.addToDo({
          userId,
          title: options.title,
        })
      )

      return
    }

    if (options.type === HANDLE_TO_DO_TYPE.CHECK) {
      setTodos(controller.checkToDo({ id: options.id }))

      return
    }

    if (options.type === HANDLE_TO_DO_TYPE.INIT) {
      setTodos(controller.initToDo())
    }
  }

  const fetchReadUserTodos = async () => {
    try {
      setFetchReadUserTodosLoading(true)

      const todos = await readUserToDos(userId)

      setTodos(todos)
    } catch (error) {
      throw error
    } finally {
      setFetchReadUserTodosLoading(false)
    }
  }

  return {
    state: {
      todos,
      loading: {
        fetchReadUserTodos: fetchReadUserTodosLoading,
      },
    },
    handleToDos,
    fetchReadUserTodos,
  }
}
