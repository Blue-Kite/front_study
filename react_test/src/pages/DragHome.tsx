import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Scard = styled.div`
    width: 800px;
    height: 800px;
    border: 1px solid black;
`;

const Sdropimage = styled.div`
    width: 800px;
    height: 300px;
    background-color: gray;
`;

const Sscollimage = styled.div`
    width: 800px;
    height: 200px;
    background-color: black;
`;


const Simagebutton = styled.button`
`;

function DragHome() {
    
    return (
        <Scard>
            <Sdropimage></Sdropimage>
            <Sscollimage></Sscollimage>
            <Simagebutton>
                제출
            </Simagebutton>
        </Scard>
    );
}

export default DragHome;