import styled from "styled-components";
import TitleInput from "./common/TitleInput";
import TextInput from "./common/TextInput";
import Button from "./common/Button";
import DropDown from "./common/DropDown";
import { Link } from 'react-router-dom';
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function WriteContent(props) {
    const [MemoData, setMemoData] = useState([]);

    const [main, setMain] = useState('');
    const [title, setTitle] = useState('');
    const [idCategory, setIdCategory] = useState(0);

    const { postid } = useParams(); //app.js에서 지정한 router값과 같아야함. 
    const [patchResult, setPatchResult] = useState([]);
    const navigate = useNavigate();

    //읽기 api
    /* const callAPI = async () => {
        axios.get("/memoList").then((res) => {
          setMemoData(res.data.result);
          MemoData.filter((item) => { if(item.idmemo ==  postid){
            return item
          }}).map((item) => {setMain(item.title); setTitle(item.main); setIdCategory(item.idcategory)})
        });
    }; */

    const callAPI = async () => {
        try{
            const res = await axios.get("/memoList");
            const data = res.data.result;
            //setMemoData(res.data.result);
            data.filter((item) => { if(item.idmemo ==  postid){
                return item
            }}).map((item) => {setMain(item.main); setTitle(item.title); setIdCategory(item.idcategory)})

        }catch(err){
            console.log("Error:", err);
        }
    };


    //수정 api
    const callAPI2 = async () => {
        const url = `/memo/${postid}`;
        axios.patch(url, {
            main: main,
            title: title, 
            idcategory: idCategory
        }).then((res) => {
            setPatchResult(res.data.result);
        });
    };

    //삭제 api
    const callAPI3 = async () => {
        const url = `/memo/${postid}`;
        axios.delete(url, {
            idmemo: postid
        }).then((res) => {
            setPatchResult(res.data.result)
        });
    };

    //useEffect는 랜더링 이후 실행됨 
    useEffect(() => {
        callAPI();
    }, []);
    
    const onClickUpdate = () => {
        callAPI2();
        navigate('/');
    }

    const onClickDelete = () => {
        callAPI3();
        navigate('/');
    }

    return (
        <Scontent>
            <StopButton> 
                <Link to='/'>
                <Button title='Back' width='100px' height='40px' left='20px' top='20px'></Button> </Link>
                <TitleInput title={title} setOldTitle={setTitle} ></TitleInput>
                <DropDown setIdCategory={setIdCategory}></DropDown>
            </StopButton>

            <SMainText>
            <TextInput setOldMain={setMain}></TextInput>
            </SMainText>

            <SbottomButton> 
                <Button title='Update' width='300px' height='40px' left='100px' top='30px' onClick={onClickUpdate}></Button> 
                <Button title='Delete' width='300px' height='40px' right='100px' top='30px' onClick={onClickDelete}></Button>  
            </SbottomButton>      
        </Scontent>
    );
}

export default WriteContent;