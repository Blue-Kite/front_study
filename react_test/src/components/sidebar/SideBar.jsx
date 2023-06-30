import styled from "styled-components";
import SidebarList from "./SidebarList";
import { useState, useEffect, useRef } from "react";
import useDetectSide from "../../hooks/useDetectSide";

const SWrapper = styled.div`
    background: darkgray;
    height: 100%;
    width: 395px;
    
`;

//width: 395px;
function SideBar(props) {
    return (
       <SWrapper>
        <SidebarList changeSelectCategory={props.changeSelectCategory} ></SidebarList>
       </SWrapper>
    );
}

export default SideBar;