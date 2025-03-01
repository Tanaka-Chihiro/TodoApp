"use client";
import { SetStateAction, useState } from "react";
import { TodoContets } from "./components/Type";
import { v4 as uuidv4 } from "uuid";
import style from "./components/page.module.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { todo } from "node:test";

export default function Todo() {
  //State
  //Todoを格納する配列
  const [todos, setTodo] = useState<TodoContets[]>([]);
  //Todoのタイトル
  const [title, setTitle] = useState<string>("");
  //編集中のTodoのID
  const [isEditingID, setisEditingID] = useState<string | null>(null);
  //編集後のTodo
  const [editedTitle, setEditedTitle] = useState("");

  //操作
  // Todoの入力
  const handleSetTitle = (e: { target: { value: SetStateAction<string> } }) => {
    setTitle(e.target.value);
  };
  //Todoの追加
  const handleAddTodo = () => {
    if (title === "") {
      alert("Todoを入力してください");
      return;
    } else {
      const addNewTodo = [...todos];
      addNewTodo.push({
        id: uuidv4(),
        title,
      });
      //確認用
      console.log(addNewTodo);
      setTodo(addNewTodo);
      setTitle("");
    }
  };

  //編集中のTodoの入力
  const handleTitleChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setEditedTitle(e.target.value);
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
        <AddTodo
          todos={todos}
          todoTitle={title}
          setTitle={handleSetTitle}
          addTodo={handleAddTodo}
        />
        {/* リスト */}
        <TodoList
          todos={todos}
          editingID={isEditingID}
          editedTitle={editedTitle}
          titleChange={handleTitleChange}
          submitTodo={handleSubmitTodo}
          editTodo={handleEditTodo}
          doneTodo={handleDoneTodo}
        />
      </div>
    </div>
  );
}
