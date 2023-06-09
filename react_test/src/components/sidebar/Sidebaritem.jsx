import {React, useState} from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

// SbItem에서 하위메뉴들을 묶어줄 div
export const Sub = styled.div`
  overflow: hidden;
  max-height: ${props => props.isOpen ? "100%" : "0"};
`;

// 메뉴명을 보여줄 div
export const Title = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${props => (props.depth * 20)}px;
  height: 32px;
  &:hover {
    background-color: #f6f6f2;
    cursor: pointer;
    border-right: solid 5px;
  }
`;

// 제일 하위메뉴에서 클릭할 Link 여기선 최하위 메뉴만 해당  
export const SbLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;
`;


const Sidebaritem = ({item, depth=0, changeSelectCategory, backToMemoList, setbackToMemoList }) => {
    const [collapsed, setCollapsed] = useState(false);
    const icon = collapsed ? <HiChevronUp /> : <HiChevronDown />;

    function toggleCollapse() {
        setCollapsed(prevValue => !prevValue);
    }

    function onSelectCategory() {
        changeSelectCategory(item.idCategory);
    } 

    //childrens 배열 여부에 따라  ==0 이면 맨 하위노드
    //맨 하위노드만 선택가능 
    if(item.childrens.length > 0) {
        return (
            <div>
              <Title depth={depth} onClick={toggleCollapse}>{item.title}{icon} </Title>
              <Sub isOpen={collapsed}>
                {item.childrens.map((child) => (
                  <Sidebaritem  item={child} depth={depth + 1} key={child.idCategory} changeSelectCategory={changeSelectCategory}/>
                ))}
              </Sub>
            </div>
        )
    }else{
        return (
            <Title depth={depth} onClick={onSelectCategory}>{item.title}</Title>
        )
    }
  }
  

export default Sidebaritem;