import styled from "styled-components";
import { Ttodo, todoListState } from "../store/toDo";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Item = ({ id, content }: Ttodo) => {
  const todoList = useRecoilValue(todoListState);
  const setTodoList = useSetRecoilState(todoListState);

  const handleDeleteContent = (id: number) => {
    const newTodoList = todoList.filter((todo) => todo.id != id);
    setTodoList(newTodoList);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "row", width: "fix-content" }}
    >
      <p>{content}</p>
      <button onClick={() => handleDeleteContent(id)}>삭제</button>
    </div>
  );
};

export default Item;
