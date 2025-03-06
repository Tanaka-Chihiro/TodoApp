"use client";
import { SetStateAction, useState } from "react";
import { TodoContets } from "./components/Type";
import { v4 as uuidv4 } from "uuid";
import style from "./components/page.module.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default function Todo() {
  //State
  //Todoを格納する配列
  const [todos, setTodo] = useState<TodoContets[]>([]);
  //Todoのタイトル
  const [title, setTitle] = useState<string>("");
  //期日
  const [date, setDate] = useState("");
  //編集中のTodoのID
  const [isEditingID, setisEditingID] = useState<string | null>(null);
  //編集後のTodo
  const [editedTitle, setEditedTitle] = useState("");
  //編集後の日付
  const [editedDate, setEditedDate] = useState("");

  //操作
  // Todoの入力
  const handleSetTitle = (e: { target: { value: SetStateAction<string> } }) => {
    setTitle(e.target.value);
  };
  const handleSetDate = (e: { target: { value: SetStateAction<string> } }) => {
    setDate(e.target.value);
  };
  //Todoの追加
  const handleAddTodo = () => {
    if (title === "" || date === "") {
      alert("タイトルと日付の入力は必須です");
      return;
    } else {
      const addNewTodo = [...todos];
      addNewTodo.push({
        id: uuidv4(),
        title,
        date,
      });
      setTodo(addNewTodo);
      setTitle("");
      setDate("");
    }
  };

  //編集中のTodoの入力
  const handleTitleChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setEditedTitle(e.target.value);
  };
  //編集中の期限の入力
  const handleDateChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setEditedDate(e.target.value);
  };
  //Todoの編集ボタン
  const handleEditTodo = (id: string, title: string, date: string) => {
    setisEditingID(id);
    setEditedTitle(title);
    setEditedDate(date);
  };
  //Todoの再投稿ボタン
  const handleSubmitTodo = (id: string) => {
    const editedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editedTitle, date: editedDate } : todo
    );
    setTodo(editedTodos);
    setisEditingID(null);
    setEditedTitle("");
    setEditedDate("");
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
          date={date}
          setTitle={handleSetTitle}
          setDate={handleSetDate}
          addTodo={handleAddTodo}
        />
        {/* リスト */}
        <TodoList
          todos={todos}
          editingID={isEditingID}
          editedTitle={editedTitle}
          editedDate={editedDate}
          titleChange={handleTitleChange}
          dateChange={handleDateChange}
          submitTodo={handleSubmitTodo}
          editTodo={handleEditTodo}
          doneTodo={handleDoneTodo}
        />
      </div>
    </div>
  );
}
