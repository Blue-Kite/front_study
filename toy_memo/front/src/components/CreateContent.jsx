import styled from "styled-components";
import TitleInput from "./common/TitleInput";
import TextInput from "./common/TextInput";
import Button from "./common/Button";
import DropDown from "./common/DropDown";
import { Link } from 'react-router-dom';
import { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Scontent = styled.div`
    width: 100wh;
    height: calc(100vh - 167px);
    position: relative;
`;

const StopButton = styled.div`
    width: 80%;
    height: 100px;
    position: absolute;
    left: 50%;
    transform: translate(-50%); 
    z-index: 200;  
`;

const SMainText = styled.div`
    width: 90%;
    height: calc(100% - 200px);
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate(-50%);
    z-index: 100;
`;

const SbottomButton = styled.div`
    width: 80%;
    height: 100px;
    position: absolute;
    left: 50%;
    top: calc(100% - 100px);
    transform: translate(-50%);
`;


function CreateContent() {
    const [main, setMain] = useState('');
    const [title, setTitle] = useState('');
    const [idCategory, setIdCategory] = useState(0);
    const navigate = useNavigate();

    const callAPI = async () => {
        axios.post("/memo", {
            main: main,
            title: title, 
            idcategory: idCategory
        }).then((res) => {
            
        }).catch((error) => {
            console.log(error);
        });      
    };
      
    //useCallback 함수로 바꾸어야하는가?
    const onClickCreateButton = () => {
        callAPI();
        navigate('/');
    }

    return (
        <Scontent>
            <StopButton> 
                <Link to='/'>
                <Button title='Back' width='100px' height='40px' left='20px' top='20px'></Button> </Link>
                <TitleInput setOldTitle={setTitle} ></TitleInput>
                <DropDown setIdCategory={setIdCategory}></DropDown>
            </StopButton>

            <SMainText>
            <TextInput setOldMain={setMain}></TextInput>
            </SMainText>

            <SbottomButton> 
                <Button title='Create' width='300px' height='40px' right='100px' top='30px' onClick={onClickCreateButton}></Button>  
            </SbottomButton>      
        </Scontent>
    );
}

export default CreateContent;