const scaleNames = {
    c: "섭씨",
    f: "화씨",
};

function TemperatureInput(props) {
    //온도가 바뀌면 onTemperatureChange를 통해 변경된 값을 상위컴포넌트에 전달함 
    const handleChange = (event) => {
        props.onTemperatureChange(event.target.value);
    };

    return (
        <fieldset>
            <legend>
                온도를 입력해주세요(단위:{scaleNames[props.scale]}):
            </legend>
            <input value={props.temperature} onChange={handleChange} />
        </fieldset>
    );
}

export default TemperatureInput;