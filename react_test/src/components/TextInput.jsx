import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

const Textarea = styled.textarea`
    width: 100%;
	min-height: 250px;
	overflow: hidden;
    border: 1px solid blue;
`
function TextInput(props) {
    const [newMain, setNewMain] = useState('');
    const ref = useRef();

	const onChange= (e) => {
        setNewMain(e.target.value);
        props.setOldMain(e.target.value);
	}

    useEffect(() => {
        ref.current.style.height = "0px";
        const scrollHeight = ref.current.scrollHeight;
        ref.current.style.height = scrollHeight + "px";
    }, []);

    return (
        <Textarea ref={ref} value={newMain} onChange={onChange} />
    );
}

export default TextInput;