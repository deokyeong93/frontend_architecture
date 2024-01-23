interface ToDoControllerImpl {
  addToDo: ({title, userId}: Pick<ToDo, 'title' | "userId">) => ToDo[]
  checkToDo: ({id} : Pick<ToDo, 'id'>) => ToDo[]
  initToDo: () => ToDo[]
}

export type ToDo = {
  userId: number, 
  id: number, 
  title: string, 
  completed: boolean
}

export class ToDoController implements ToDoControllerImpl {
    constructor(private todos: ToDo[]) {
      this.todos = [...todos]
    }
    
    addToDo({title, userId} : Pick<ToDo, 'title' | "userId">) {
      this.todos.push({
          id: this.todos.length + 1,
          userId,
          title,
          completed: false
      })

      return this.todos
    }

    checkToDo({id} : Pick<ToDo, 'id'>){
      const targetIndex = this.todos.findIndex(todo => todo.id === id)

      this.todos.splice(
        targetIndex, 
        1, 
        {
          ...this.todos[targetIndex], 
          completed: !this.todos[targetIndex].completed
        }
      )

      return this.todos
    }

    initToDo() {
      this.todos = []

      return this.todos
    }
}
