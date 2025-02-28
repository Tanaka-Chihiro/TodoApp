"use client";
import { SetStateAction, useState } from "react";
import { TodoContets } from "./lib/Type";
import { v4 as uuidv4 } from "uuid";

import style from "./page.module.css";

export default function Todo() {
  const [title, setTitle] = useState<string>("");
  const [todos, setTodo] = useState<TodoContets[]>([
    { id: "1", title: "こめ" },
    { id: "2", title: "テスト" },
    { id: "3", title: "項目" },
  ]);
  const [isEditingID, setisEditingID] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  // Todoの入力
  const handleSetTitle = (e: { target: { value: SetStateAction<string> } }) => {
    setTitle(e.target.value);
  };

  //編集後のTodo
  const handleTitleChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setEditedTitle(e.target.value);
  };

  //Todoの追加
  const handleAddTodo = () => {
    const addNewTodo = [...todos];
    addNewTodo.push({
      id: uuidv4(),
      title,
    });
    console.log(addNewTodo);
    setTodo(addNewTodo);
    setTitle("");
  };

  //Todoの編集ボタン
  const handleEditTodo = (id: string, title: string) => {
    setisEditingID(id);
    setEditedTitle(title);
  };

  //Todoの再投稿ボタン
  const handleSubmitTodo = (id: string) => {
    setTodo(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editedTitle } : todo
      )
    );
    setisEditingID(null);
    setEditedTitle("");
  };

  //Todoの完了ボタン
  const handleDoneTodo = (id: string) => {
    const doneTodo = todos.filter((todo) => todo.id !== id);
    setTodo(doneTodo);
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
            onChange={handleSetTitle}
            className={style.todo_form}
          />
          <button className={style.add} onClick={handleAddTodo}>
            Add
          </button>
        </div>
        {/* リスト */}
        {todos.map((todo) => (
          <ul key={todo.id} className={style.todo_list}>
            <li className={style.todo_contents}>
              {isEditingID === todo.id ? (
                <input
                  type="text"
                  key="todoContents"
                  id={todo.id}
                  value={editedTitle}
                  name={todo.title}
                  className={style.todo_title}
                  onChange={handleTitleChange}
                />
              ) : (
                <p className={style.todo_title}>{todo.title}</p>
              )}
              {isEditingID === todo.id ? (
                <button
                  onClick={() => handleSubmitTodo(todo.id)}
                  id={todo.id}
                  className={style.edit}
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => handleEditTodo(todo.id, todo.title)}
                  id={todo.id}
                  className={style.edit}
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDoneTodo(todo.id)}
                id={todo.id}
                className={style.done}
              >
                Done
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
