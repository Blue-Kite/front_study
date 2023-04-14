import styled from "styled-components";

const StitleInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    font-weight: 500;
    font-size: 1.25rem;
    border: 1px solid red;
`;



function TitleInput(props) {
    const { onChange, title, body } = props;
    return (
        <StitleInput 
                    name="title" 
                    onChange={onChange} 
                    placeholder="제목" 
                    value={title}/>
                
    );
}

export default TitleInput;