import styled from "styled-components";
import { useState, useEffect} from "react";

const StitleInput = styled.input`
    width: 70%;
    height: 50%;
    border: none;
    outline: none;
    font-weight: 500;
    font-size: 1.25rem;
    border: 1px solid red;
    position: absolute;
    right: 200px;
    top: 20px
`;


function TitleInput(props) {
    const [newtitle, setNewTitle] = useState('');
    
    const onChange = (e) => {
        setNewTitle(e.target.value);
        props.setOldTitle(e.target.value);
    };

    return (
    
        <StitleInput 
                    name="title" 
                    onChange={onChange} 
                    placeholder="제목" 
                    value={newtitle}
                />             
    );
}

export default TitleInput;