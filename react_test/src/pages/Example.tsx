import { useState, useRef, useEffect, useReducer } from "react";
import Editor from "../components/todo/Editor";
import { Todo } from '../types/types';
import TodoItem from "../components/todo/TodoItem";


function Example() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [text, setText] = useState("");
    const idRef = useRef(0);

    const onClickAdd = (text: string) => {
        setTodos([
            ...todos,
            {
                id: idRef.current++,
                content: text,
            }
        ]);
    }

    const onClickDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id != id))
    }

    useEffect(() => {
        console.log(todos);
    }, [todos]);
    
    return (
        <div>
            <h1>Todo</h1>
            <Editor onClickAdd={onClickAdd}></Editor>
            <div>
                {todos.map((todo)=>(
                    <TodoItem onClickDelete={onClickDelete} key={todo.id} {...todo} ></TodoItem>
                ))}
            </div>
        </div>
    );
}

export default Example;