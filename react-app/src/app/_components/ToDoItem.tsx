import "../../../../core/styles/toDoList.css"

import { HANDLE_TO_DO_TYPE } from "../../../../core/constant"
import { HandleToDosOption } from "../_hooks/todo"

interface ToDoItemProps {
  handleCheckbox: (options: HandleToDosOption) => void
  completed: boolean
  title: string
  id: number
}

export default function ToDoItem(props: ToDoItemProps) {
  return (
    <li
      className="todo-item"
      onClick={() =>
        props.handleCheckbox({ type: HANDLE_TO_DO_TYPE.CHECK, id: props.id })
      }
    >
      <input type="checkbox" className="todo-input" defaultChecked={props.completed} />
      <p className="itemTextClasses">{props.title}</p>
    </li>
  )
}
