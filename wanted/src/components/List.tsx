import styled from "styled-components";
import Item from "./Item";
import Form from "./Form";
import { useRecoilValue } from "recoil";
import { todoListState } from "../store/toDo";

const List = () => {
  const todoList = useRecoilValue(todoListState);

  return (
    <div>
      <Form />
      <p>TodoList</p>
      {todoList &&
        todoList.map((todo) => (
          <Item key={todo.id} id={todo.id} content={todo.content} />
        ))}
    </div>
  );
};

export default List;
