import styled from "styled-components";
import ScrollMemo from "./ScrollMemo";

const SMemoList = styled.div`
    width: 100%;
    height: calc(100% - 150px);
    position: absolute;
    top: 80px;
`;

function MemoList({search, selectCategory}) {
    return (
        <SMemoList>
            <ScrollMemo search={search} selectCategory={selectCategory}></ScrollMemo>
        </SMemoList>
    );
}

export default MemoList;