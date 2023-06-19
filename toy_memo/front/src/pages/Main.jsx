import styled from "styled-components";
import Header from "../components/Header";
import Content from "../components/Content";
import axios from "axios";
import { useEffect } from "react";

//자바스크립트 객체 속성에서는 - 를 허용하지 않음
//CSS 속성명을 캐멀케이스로 작성해야함, 값은 문자열이나 수치만 가능하다고 함 
const styles1 = {
    Container: {
        height: "100vh"
    },
};

function Main(props) {
    /* const callAPI = async () => {
        axios.get("/dummy").then((res) => console.log(res.data.test))
    };

    useEffect(() => {
        callAPI();
    }, []); */
    
    return (
        //JSX 규칙으로 최종적으로 한개의 태그만 반환 
        <div style={styles1.Container}>
            <Header></Header>
            <Content>  
            </Content>           
        </div>        
    );
} 

export default Main;