import styled from "styled-components";
import TitleInput from "./common/TitleInput";
import TextInput from "./common/TextInput";

const Scontent = styled.div`
    width: 100wh;
    height: calc(100vh - 167px);
    background: skyblue;
    position: relative;
`;

const StopButton = styled.div`
    width: 80%;
    height: 100px;
    background: darkgray;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    
`;

const SMainText = styled.div`
    width: 90%;
    height: calc(100% - 200px);
    background: gray;
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate(-50%);
`;

const SbottomButton = styled.div`
    width: 80%;
    height: 100px;
    background: lightgray;
    position: absolute;
    left: 50%;
    top: calc(100% - 100px);
    transform: translate(-50%);
`;


function CreateContent(props) {
    return (
        <Scontent>
            <StopButton> <TitleInput></TitleInput>
            </StopButton>
            <SMainText>
            <TextInput></TextInput>
            </SMainText>
            <SbottomButton></SbottomButton>      
        </Scontent>
    );
}

export default CreateContent;