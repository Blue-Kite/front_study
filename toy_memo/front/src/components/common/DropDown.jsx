import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import useDetectClose from "../../hooks/useDetectClose";
import SelectDropDown from "./SelectDropDown";
import { HiChevronDown } from "react-icons/hi";
import axios from "axios";

const ItemWrap = styled.div`
  width: 100px;
  border: 1px solid red;
  z-index: 0;
  position: absolute;
  right: 40px;
  top: 20px;
  background: skyblue;
`;

const Item = styled.div``;

const DropDown = (props) => {
  //props.setIdcategory : 유저가 선택한 카데고리의 id 
  const [itemList, setItemList] = useState([]); // 루트노드가 아닌 메모 이름
  const [categoryData, setCategoryData] = useState([]); //전체 카데고리 데이터 
  const dropDownRef = useRef();
  const [CategoryIdentify, setCategoryIdentify] = useState(""); //유저가 선택한 카데고리 이름 
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const [idTitleMap, setIdTitleMap] = useState({}); // 메모이름 - 카데고리아이디 맵핑 

  const callAPI = async () => {
    axios.get("/category").then((res) => {
      setCategoryData(res.data.result);
    });

    const maps = {}; //메모 이름을 키로 각 메모마다 카데고리 id를 매칭 
    const prevItem = []; //루트노드가 아닌 메모 이름을 담음

    categoryData.map((item) => {
        maps[item.title] = item.idCategory
        if (item.parentId != 0){
            prevItem.push(item.title);
        }
    });
    setItemList(prevItem);
    setIdTitleMap(maps);
  };

  useEffect(() => {
    callAPI();
  }, [categoryData]);

  return (
    <ItemWrap>
      <Item ref={dropDownRef}>
        <div
          style={{
            position: "relative",
            width: "100px",
            height: "30px",
            backgroundColor: "skyblue",
          }}
        >
          <input
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            value={CategoryIdentify}
            style={{
              backgroundColor: "skyblue",
              border: "none",
              width: "100px",
            }}
          />
          <HiChevronDown
            style={{
              position: "absolute",
              right: "5px",
            }}
          ></HiChevronDown>
        </div>

        {isOpen && (
          <ul style={{ padding: 0, margin: 0 }}>
            {itemList.map((value, index) => (
              <SelectDropDown
                key={value}
                value={value}
                setIsOpen={setIsOpen}
                setCategoryIdentify={setCategoryIdentify}
                isOpen={isOpen}
                idTitleMap={idTitleMap}
                setIdCategory={props.setIdCategory}
              />
            ))}
          </ul>
        )}
      </Item>
      
    </ItemWrap>
  );
};

export default DropDown;
