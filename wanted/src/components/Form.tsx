import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState } from "../store/toDo";

const Form = () => {
  const [content, setContent] = useState("");
  const todoList = useRecoilValue(todoListState);
  const setTodoList = useSetRecoilState(todoListState);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleAddContent = () => {
    setTodoList((prev) => [
      ...prev,
      {
        id: todoList.length + 1,
        content: content,
      },
    ]);
    setContent("");
  };

  return (
    <div>
      <input value={content} onChange={handleOnChange} />
      <button onClick={handleAddContent}>추가</button>
    </div>
  );
};

export default Form;
