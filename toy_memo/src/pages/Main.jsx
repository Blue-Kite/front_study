import styled from "styled-components";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import MemoList from "../components/MemoList"

const styles1 = {
    Container: {
        height: "100vh"
    },
};

const styles2 = {
    Container: {
        width: "100wh",
        height: "calc(100vh - 167px)", 
        display: 'flex'
    },
};

function Main(props) {
    return (
        //JSX 규칙으로 최종적으로 한개의 태그만 반환 
        <div style={styles1.Container}>
            <Header></Header>
            <div style={styles2.Container}>
                <SideBar></SideBar>
                <MemoList></MemoList>
            </div>
        </div>        
    );
} 

export default Main;