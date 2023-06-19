//https://garve32.tistory.com/53

import styled from "styled-components";
import Sidebaritem from "./Sidebaritem";
import axios from "axios";
import { useState, useEffect } from "react";

// 사이드바 전체
export const Container = styled.div`
  min-width: 16rem;
  width: auto;
  height: auto;
  min-height: 70vh;
  font-size: 14px;
`;

const SidebarList = (props) => {
  const [categoryData, setCategoryData] = useState([]);
  const [tree, setTree] = useState([]);

  const callAPI = async () => {
    axios.get("/category").then((res) => {
      //console.log(res.data.result);
      setCategoryData(res.data.result)
    });
  };

  const makeTree = () => {
      const nest = (categoryData, idCategory = 0, link = 'parentId') =>
      categoryData.filter(item => item[link] === idCategory).map(item => ({ ...item, childrens: nest(categoryData, item.idCategory) }));
      setTree(nest(categoryData));
  };

  //useEffect는 랜더링 이후 실행됨 
  useEffect(() => {
    callAPI();
    makeTree();
  }, [categoryData]);

  return (
    <Container>
      {tree.map((subItem, index) => (
        <Sidebaritem item={subItem} key={subItem.idCategory} changeSelectCategory={props.changeSelectCategory} />
      ))}
    </Container>
  );
};

export default SidebarList;
