import styled from "styled-components";

const Scard = styled.div`
    width: 100%;
    height: calc(100%/3);
    border: 1px solid black;
    background-color: #ffffff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; 
`;

const SmemoTitle = styled.div`
    color: blue;
`;

const SmemoMain = styled.div`
    color: black;
`;

function Card(props) {
    return (
        <Scard onClick={props.onClick}>
            <SmemoTitle>{props.item.title}</SmemoTitle>
            <SmemoMain>{props.item.main}</SmemoMain>
        </Scard>
    );
}

export default Card;