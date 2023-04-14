import styled from "styled-components";
import Card from "./common/Card";

const SscrollMemo = styled.div`
    background: green;
    width: 1050px;
    height: calc(100% - 30px);
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%);
`;

function ScrollMemo(props) {
    return (
        <SscrollMemo>
            <Card></Card>
            <Card></Card>
            <Card></Card>
        </SscrollMemo>
    );
}

export default ScrollMemo;