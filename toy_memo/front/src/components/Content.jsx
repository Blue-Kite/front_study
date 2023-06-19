import styled from "styled-components";
import SideBar from "./sidebar/SideBar";
import HomeMemo from "./HomeMemo";
import { useState, useRef } from "react";
import useDetectSide from "../hooks/useDetectSide";

const Scontent = styled.div`
    width: 100wh;
    height: calc(100vh - 167px);
    display: flex;
`;

function Content(props) {
    const memoRef = useRef();
    const [selectCategory, setSelectCategory] = useDetectSide(memoRef, false);

    return (
        <Scontent ref={memoRef}>
            <SideBar changeSelectCategory={setSelectCategory}></SideBar>
            <HomeMemo selectCategory={selectCategory}></HomeMemo>
        </Scontent>
    );
}

export default Content;