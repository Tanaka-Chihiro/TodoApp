import style from "./page.module.css";

export default function Todo() {
  return (
    <div className={style.body}>
      <h1 className={style.title}>My Todo List</h1>
      <div className={style.todo_area}>
        {/* 入力フォーム */}
        <div className={style.form}>
          <input type="text" className={style.todo_form} />
          <button className={style.add}>Add</button>
        </div>
        {/* リスト */}
        <ul className={style.todo_list}>
          <li className={style.todo_contents}>
            <input type="text" name="" id="" className={style.todo_title} />
            <button className={style.edit}>Edit</button>
            <button className={style.done}>Done</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
