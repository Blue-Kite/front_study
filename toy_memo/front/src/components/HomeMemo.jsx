import styled from "styled-components";
import SearchBar from "./common/SearchBar";
import MemoList from "./MemoList";
import Button from "./common/Button";
import { Link } from 'react-router-dom';
import { useState } from "react";

//search bar에 absolute를 주고 싶으면 부모것에 position이 있어야해서 relative를 줌 
const Wrapper = styled.main`
  width: calc(100% - 395px);
  height: 100%;
  position: relative; 
`;

// width: calc(100% - 395px);
function HomeMemo(props) {
    const [search, setSearch] = useState('');
    
    return (
        <>
        <Wrapper>        
          <SearchBar changeSearch={setSearch}></SearchBar>
          <MemoList search={search} selectCategory={props.selectCategory}></MemoList>
          <Link to ='/postview'>
            <Button width="100px" height = "40px" title = 'CREATE' right="30px" bottom="20px"></Button>
          </Link>
        </Wrapper>
        </>

    );
}

export default HomeMemo;