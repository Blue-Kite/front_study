import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

const ItemWrap = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;

    overflow: auto;

    &::-webkit-scrollbar {
        background: skyblue;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
    }
`
const Scard = styled.div`
    width: 100%;
    height: calc(100%/3);
    border: 1px solid black;
    background-color: #ffffff;
`;

const Scroll = (props) => {
    const [MemoData, setMemoData] = useState([]);
    const navigate = useNavigate();

    const callAPI = async () => {
        axios.get("/memoList").then((res) => {
          setMemoData(res.data.result)
        });
    };
    
    //useEffect는 랜더링 이후 실행됨 
    useEffect(() => {
        callAPI();
    }, [MemoData]);

    if (props.search){
      return(
        <ItemWrap>
          {MemoData.filter((item) => { if(item.title.includes(props.search)){
          return item
          }}).map((item) => (<Card item={item} key={item.idmemo} onClick={() => {navigate(`/postwrite/${item.idmemo}`)}}></Card>))}
        </ItemWrap>
      );
    }
    if (props.selectCategory){
      return(
        <>
        <ItemWrap>
          {MemoData.filter((item) => { if(item.idcategory == props.selectCategory){
          return item
          }}).map((item) => (<Card item={item} key={item.idmemo} onClick={() => {navigate(`/postwrite/${item.idmemo}`)}}></Card>))}
        </ItemWrap>
        </>
      );
    }
    else{
      return(
        <ItemWrap>
          {MemoData.map((item, index) => (<Card item={item} key={item.idmemo} 
          onClick={() => {navigate(`/postwrite/${item.idmemo}`)}}></Card>
          ))}
        </ItemWrap>
      );
    }
    
  }

  export default Scroll;
