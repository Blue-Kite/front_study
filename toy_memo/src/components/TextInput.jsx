const styles = {
    wrapper: {
        background: "blue"
    },
    title: {
        color: "red"
        
    }
    //style={styles.wrapper}
};

function TextInput(props) {
    return (
        <form>
            <label>
                검색
                <input type="text" name="name"/>
            </label>
            <button type="submit">제출</button>
        </form>
    );
}

export default TextInput;