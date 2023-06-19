import styled from "styled-components";

const SWrapper = styled.div`
  background: #E5E5E5;
  height: 167px;
`;

const STitle = styled.p`
    font-size: 64px;
    color: black;
    position: absolute;
    left: 100px;
    top: 30px;
`;


function Header(props) {
    return (
        <SWrapper>
            <STitle>NoteApp</STitle>
        </SWrapper>
    );
}

export default Header;