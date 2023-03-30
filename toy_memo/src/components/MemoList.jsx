import styled from "styled-components";
import SearchBar from "./SearchBar";

//search bar에 absolute를 주고 싶으면 부모것에 position이 있어야해서 relative를 줌 
const Wrapper = styled.main`
  background: Red;
  width: calc(100% - 395px);
  height: 100%;
  position: relative; 
`;

// width: calc(100% - 395px);
function MemoList(props) {
    return (
        <>
        <Wrapper>        
          <SearchBar></SearchBar>
        </Wrapper>
        </>

    );
}

export default MemoList;