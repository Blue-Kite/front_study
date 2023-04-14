import styled from "styled-components";

const Wrapper = styled.div`
  background: #E5E5E5;
  height: 167px;
`;

const Title = styled.p`
    font-size: 64px;
    color: red;
`;


//버튼의 색깔, 글자, 크기를 각 상위 페이지에서 props로 넘겨받음
//각 버튼의 기능은 어디서 하나..???  
function Button(props) {

    //props의 분할 대입 


    //props 내용으로 css 설정
    const contentStyle = {
        
    };


    return (
        <Wrapper>
            <Title>NoteApp</Title>
        </Wrapper>
    );
}

export default Button;