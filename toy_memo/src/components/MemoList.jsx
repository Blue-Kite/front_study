import styled from "styled-components";
import ScrollMemo from "./ScrollMemo";

const SMemoList = styled.div`
    background: yellow;
    width: 100%;
    height: calc(100% - 80px);
    position: absolute;
    top: 80px;
`;

function MemoList(props) {
    return (
        <SMemoList>
            <ScrollMemo></ScrollMemo>
        </SMemoList>
    );
}

export default MemoList;