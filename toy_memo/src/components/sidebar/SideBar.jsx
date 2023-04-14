import styled from "styled-components";
import SidebarList from "./SidebarList";

const SWrapper = styled.div`
    background: gray;
    height: 100%;
    width: 395px;
    
`;

//width: 395px;
function SideBar(props) {
    return (
       <SWrapper>
        <SidebarList></SidebarList>
       </SWrapper>
    );
}

export default SideBar;