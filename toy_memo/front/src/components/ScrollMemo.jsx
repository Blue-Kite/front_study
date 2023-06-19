import styled from "styled-components";
import Card from "./common/Card";
import axios from "axios";
import {useState, useEffect} from 'react';
import Scroll from "./common/Scroll";

const SscrollMemo = styled.div`
    width: 1050px;
    height: calc(100% - 30px);
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%);
`;

function ScrollMemo({search, selectCategory}) {
    return (
        <SscrollMemo>
            <Scroll search={search} selectCategory={selectCategory}></Scroll>
        </SscrollMemo>
    );
}

export default ScrollMemo;