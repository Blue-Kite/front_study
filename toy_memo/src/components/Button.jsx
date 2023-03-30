import styled from "styled-components";

const Wrapper = styled.div`
  background: #E5E5E5;
  height: 167px;
`;

const Title = styled.p`
    font-size: 64px;
    color: red;
`;


function Button(props) {
    return (
        <Wrapper>
            <Title>NoteApp</Title>
        </Wrapper>
    );
}

export default Button;