//https://garve32.tistory.com/53

import styled from "styled-components";
import Sidebaritem from "./Sidebaritem";

const dataset = [{
    menuId: 1, 
    title: "여행",
    parentId: "root"
},
{
    menuId: 2, 
    title: "집안일",
    parentId: "root"
},
{
    menuId: 3, 
    title: "자기계발",
    parentId: "root"
},
{
    menuId: 4, 
    title: "제주도",
    parentId: 1,
},
{
    menuId: 5, 
    title: "도쿄",
    parentId: 1,
},
{
    menuId: 7, 
    title: "쇼핑",
    parentId: 2,
},
{
    menuId: 8, 
    title: "청소",
    parentId: 2,
},
{
    menuId: 9, 
    title: "자격증",
    parentId: 3,
},
]

// 사이드바 전체
export const Container = styled.div`
  min-width: 16rem;
  width: auto;
  height: auto;
  min-height: 70vh;
  font-size: 14px;
`

const Sidebar = ({ items }) => {
    const nest = (dataset, menuId = "root", link = 'parentId') =>
    dataset.filter(item => item[link] === menuId).map(item => ({ ...item, childrens: nest(dataset, item.menuId) }));
    const tree = nest(dataset);
    
    return (
      <Container>
        {tree.map((subItem, index) =>
          <Sidebaritem item={subItem} key={subItem.menuId} />
        )}
      </Container>
    )
  }

export default Sidebar;
