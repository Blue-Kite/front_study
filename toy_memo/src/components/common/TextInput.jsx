import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

const Textarea = styled.textarea`
	min-height: 100px;
	overflow: hidden;
    border: 1px solid blue;
`
function TextInput(props) {
    const [value, setValue] = useState("")
    const ref = useRef();

	const onChange= (event) => {
		const v = event.target.value
		setValue(v)
	}

    useEffect(() => {
        ref.current.style.height = "0px";
        const scrollHeight = ref.current.scrollHeight;
        ref.current.style.height = scrollHeight + "px";
    }, [value]);

    return (
        <Textarea ref={ref} value={value} onChange={onChange} />
    );
}

export default TextInput;