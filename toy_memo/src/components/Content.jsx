import styled from "styled-components";
import SideBar from "./sidebar/SideBar";
import HomeMemo from "./HomeMemo";

const Scontent = styled.div`
    width: 100wh;
    height: calc(100vh - 167px);
    display: flex;
`;

function Content(props) {
    return (
        <Scontent>
            <SideBar></SideBar>
            <HomeMemo></HomeMemo>
        </Scontent>
    );
}

export default Content;