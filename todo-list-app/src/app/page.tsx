"use client";
import { SetStateAction, useState } from "react";
import { TodoContets } from "./lib/Type";

import style from "./page.module.css";

export default function Todo() {
  let maxID = 0;
  const [title, setTitle] = useState<string>("");
  const [todos, setTodo] = useState<TodoContets[]>([]);
  const [isDisabled, setisDisabled] = useState(false);

  const handleTitleChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setTitle(e.target.value);
  };

  const handleAddTodo = () => {
    const addNewTodo = todos.slice();
    addNewTodo.push({
      id: String(++maxID),
      title,
    });
    console.log(addNewTodo);
    setTodo(addNewTodo);
    setTitle("");
  };

  const handleEditTodo = () => {};

  const handleSubmitTodo = () => {
    setisDisabled(false);
  };

  const handleDoneTodo = () => {
    // const doneTodo = todos.findIndex((value) => value.id === id);
  };

  return (
    <div className={style.body}>
      <h1 className={style.title}>My Todo List</h1>
      <div className={style.todo_area}>
        {/* 入力フォーム */}
        <div className={style.form}>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className={style.todo_form}
          />
          <button className={style.add} onClick={handleAddTodo}>
            Add
          </button>
        </div>
        {/* リスト */}
        <ul className={style.todo_list}>
          {todos.map((todo) => (
            <li className={style.todo_contents}>
              {isDisabled ? (
                <input
                  type="text"
                  key={"TODO" + todo.id}
                  id={todo.id}
                  value={todo.title}
                  name={todo.title}
                  className={style.todo_title}
                />
              ) : (
                <p className={style.todo_title}>{todo.title}</p>
              )}
              {isDisabled ? (
                <button
                  onClick={handleSubmitTodo}
                  id={todo.id}
                  className={style.edit}
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleEditTodo}
                  id={todo.id}
                  className={style.edit}
                >
                  Edit
                </button>
              )}
              <button
                onClick={handleDoneTodo}
                id={todo.id}
                className={style.done}
              >
                Done
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
