"use client";
import { SetStateAction } from "react";
import style from "./page.module.css";

type AddTodoProps = {
  todoTitle: string;
  setTitle: (e: { target: { value: SetStateAction<string> } }) => void;
  addTodo: () => void;
};

export default function AddTodo({
  todoTitle,
  setTitle,
  addTodo,
}: AddTodoProps) {
  return (
    <div className={style.form}>
      <input
        type="text"
        id="title"
        value={todoTitle}
        onChange={setTitle}
        className={style.todo_form}
      />
      <button className={style.add} onClick={addTodo}>
        Add
      </button>
    </div>
  );
}
