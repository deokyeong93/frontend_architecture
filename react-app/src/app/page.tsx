"use client"

import Image from "next/image"
import logo from "../../public/logo.svg"
import "../../../core/styles/app.css"
import {
  TO_DO_PLACEHOLDER,
  MOCK_USER_ID,
  HANDLE_TO_DO_TYPE,
} from "../../../core/constant/index"
import { useEffect, useMemo, useRef, useState } from "react"
import { useToDo } from "./_hooks/todo"
import ToDoItem from "./_components/ToDoItem"

export default function ToDoApp() {
  const [title, setTitle] = useState("")
  const {
    fetchReadUserTodos,
    state: appState,
    handleToDos,
  } = useToDo(MOCK_USER_ID)

  const todoItemsRef = useRef<HTMLUListElement>(null)

  const totalCount = useMemo(() => appState.todos.length, [appState.todos])
  const checkedCount = useMemo(
    () => appState.todos.filter((todo) => todo.completed).length,
    [appState.todos]
  )

  useEffect(() => {
    fetchReadUserTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addCheckBox = () => {
    handleToDos({ type: HANDLE_TO_DO_TYPE.ADD, title })
    setTitle("")

    setTimeout(() => {
      if (todoItemsRef.current) {
        todoItemsRef.current.scrollTo({
          top:
            todoItemsRef.current.scrollHeight +
            todoItemsRef.current.clientHeight,
        })
      }
    }, 0)
  }

  return (
    <section className="container">
      <div className="todo-wrapper">
        <div className="todo-header">
          <Image
            alt="Next logo"
            className="logo"
            src={logo}
            width="80"
            height="125"
          />
          <h2>To-do list</h2>
        </div>
        <form
          className="input-form"
          onSubmit={(e) => {
            e.preventDefault()
            addCheckBox()
          }}
        >
          <input
            type="text"
            className="input-field"
            id="todoInput"
            placeholder={TO_DO_PLACEHOLDER}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={appState.loading.fetchReadUserTodos}
          />
          <button
            className="input-btn"
            disabled={appState.loading.fetchReadUserTodos || !title.length}
          >
            추가
          </button>
        </form>
        {appState.loading.fetchReadUserTodos ? (
          <div className="todo-items">데이터를 불러오는 중입니다.</div>
        ) : (
          <ul className="todo-items" ref={todoItemsRef}>
            {appState.todos.map((todo) => (
              <div key={todo.id} className="todo-item-wrapper">
                <ToDoItem
                  id={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                  handleCheckbox={handleToDos}
                />
              </div>
            ))}
          </ul>
        )}

        <div>
          <div className="counter-container">
            <p>
              <span>{checkedCount}</span>
              <span> / </span>
              <span>{totalCount}</span>
            </p>
            <button
              onClick={() => handleToDos({ type: HANDLE_TO_DO_TYPE.INIT })}
              disabled={appState.loading.fetchReadUserTodos}
            >
              Delete All
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
