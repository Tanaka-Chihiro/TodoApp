"use client";
import { SetStateAction } from "react";
import style from "./page.module.css";
import { TodoContets } from "./Type";

type AddTodoProps = {
  todos: TodoContets[];
  todoTitle: string;
  date: string;
  setTitle: (e: { target: { value: SetStateAction<string> } }) => void;
  setDate: (e: { target: { value: SetStateAction<string> } }) => void;
  addTodo: () => void;
};

export default function AddTodo({
  todos,
  todoTitle,
  date,
  setTitle,
  setDate,
  addTodo,
}: AddTodoProps) {
  return (
    <>
      <div className={style.form}>
        <input
          type="date"
          value={date}
          onChange={setDate}
          className={style.date_form}
        />
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
      <div className={style.number_todo}>{todos.length}Todos</div>
    </>
  );
}
