import { SetStateAction } from "react";
import style from "./page.module.css";
import { TodoContets } from "./Type";

type TodoListProps = {
  todos: TodoContets[];
  editingID: string | null;
  editedTitle: string;
  editedDate: string;
  titleChange: (e: { target: { value: SetStateAction<string> } }) => void;
  dateChange: (e: { target: { value: SetStateAction<string> } }) => void;
  submitTodo: (id: string) => void;
  editTodo: (id: string, title: string, date: string) => void;
  doneTodo: (id: string) => void;
};

export default function TodoList({
  todos,
  editingID,
  editedTitle,
  editedDate,
  titleChange,
  dateChange,
  submitTodo,
  editTodo,
  doneTodo,
}: TodoListProps) {
  return (
    <ul className={style.todo_list}>
      {todos.map((todo) => (
        <li key={todo.id} className={style.todo_contents}>
          {editingID === todo.id ? (
            <>
              <input
                type="date"
                id={todo.id}
                value={editedDate}
                name={todo.title}
                onChange={dateChange}
                className={style.todo_date_editing}
              />
              <input
                type="text"
                id={todo.id}
                value={editedTitle}
                name={todo.title}
                className={style.todo_title_editing}
                onChange={titleChange}
              />
              <button
                onClick={() => submitTodo(todo.id)}
                id={todo.id}
                className={style.edit}
              >
                Submit
              </button>
              <button
                onClick={() => doneTodo(todo.id)}
                id={todo.id}
                className={style.done}
              >
                Done
              </button>
            </>
          ) : (
            <>
              <div className={style.todo_date}>{todo.date}</div>
              <div className={style.todo_title}>{todo.title}</div>
              <button
                onClick={() => editTodo(todo.id, todo.title, todo.date)}
                id={todo.id}
                className={style.edit}
              >
                Edit
              </button>
              <button
                onClick={() => doneTodo(todo.id)}
                id={todo.id}
                className={style.done}
              >
                Done
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
