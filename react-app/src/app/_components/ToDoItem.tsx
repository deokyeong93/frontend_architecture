import "../../../../core/styles/toDoItem.css"

import { HANDLE_TO_DO_TYPE } from "../../../../core/constant"
import { HandleToDosOption } from "../_hooks/todo"
import { useMemo } from "react"

interface ToDoItemProps {
  handleCheckbox: (options: HandleToDosOption) => void
  completed: boolean
  title: string
  id: number
}

export default function ToDoItem(props: ToDoItemProps) {
  const itemTextClasses = useMemo(() => {
    return Object.entries({
      "item-text": true,
      "checked-item-text": props.completed,
    })
      .filter(([className, isUse]) => isUse, "")
      .map(([className, isUse]) => className)
      .join(" ")
  }, [props.completed])

  return (
    <li
      className="todo-item"
      onClick={() =>
        props.handleCheckbox({ type: HANDLE_TO_DO_TYPE.CHECK, id: props.id })
      }
    >
      <input
        readOnly
        type="checkbox"
        className="todo-input"
        checked={props.completed}
      />
      <p className={itemTextClasses}>{props.title}</p>
    </li>
  )
}
