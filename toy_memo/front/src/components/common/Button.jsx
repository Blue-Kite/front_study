import styled from "styled-components";

const StyledButton = styled.button`
    width: ${props => props.width};
    height: ${props => props.height};

    margin: 0;
    border: none;
    cursor: pointer;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 10px;
    background: ${props => props.background};
    color: ${props => props.color};
    position: absolute;
    left: ${props => props.left};
    right: ${props => props.right};
    top: ${props => props.top};
    bottom: ${props => props.bottom};

    &:active,
    &:hover,
    &:focus {
        background: var(--button-hover-bg-color, #025ce2);
    }

    &:disabled {
        cursor: default;
        opacity: 0.5;
        background: var(--button-bg-color, #025ce2);
    }
`;


//버튼의 색깔, 글자, 크기를 각 상위 페이지에서 props로 넘겨받음 
function Button({ disabled, title, children, width, height, left, right, top, bottom, onClick }) {

    return (
        <StyledButton disabled={disabled} width = {width} height = {height} 
        left = {left} right = {right} top={top} bottom={bottom} onClick={onClick} type='submit'> {title} {children}</StyledButton>
    );
}

export default Button;