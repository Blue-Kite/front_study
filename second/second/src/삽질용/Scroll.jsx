//https://typo.tistory.com/entry/Reactjs-Intersection-observer-%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4

import styled from "styled-components";
import ReactLoading from "react-loading";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const ItemWrap = styled.div`
  width: 50%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: gray;
  position: absolute;
  left: 30%;
  top: 30%;
  overflow: scroll;

  

  .Item {
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    margin: 1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 6px;
  }
`;

const LoaderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

function Scroll(props) {
    const [itemList, setItemList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [target, setTarget] = useState(""); // target
    const [isLoding, setIsLoding] = useState(false); // isloding

    const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting && !isLoding) {
          observer.unobserve(entry.target);
          setIsLoding(true);
          // 데이터를 가져오는 부분
          setIsLoding(false);
          observer.observe(entry.target);
        }
      };
    
      useEffect(() => {
        let observer;
        if (target) {
          // callback 함수, option
          observer = new IntersectionObserver(onIntersect, {
            root: null,
            threshold: 0.4,
          });
          observer.observe(target); // 타겟 엘리먼트 지정
        }
        return () => observer && observer.disconnect();
      }, [target]);
      
    return (
        <>
        <ItemWrap>
        {itemList.map((item, index) => (
          <div className="Item" key={index}>
            {index + 1}
          </div>
        ))}
        <div ref={setTarget}></div>
        </ItemWrap>
        {isLoding ? (
        <LoaderWrap>
          <ReactLoading type="spin" color="#A593E0" />
        </LoaderWrap>
        ) : (
        "")}
        </>
  );
}

export default Scroll;
