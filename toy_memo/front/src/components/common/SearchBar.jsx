import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";

const SWrapper = styled.div`
    
    display: flex;
    justify-content: center;
    
    position: absolute;
    left: 125px;
    top: 30px;
`;

const styles = {
    form: {
        position: "relative",
    }, 
    search: {
        position: "absolute",
        left: "20px",
        top: "15px",
    }, 
    query: {
        width: "900px",
        height: "50px",
        borderRadius: "20px",
        border: "1px solid #bbb", 
        paddingLeft: "40px",
    },
};

function SearchBar(props) {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("")
    const [resSearch, setResSearch] = useState("");

    const onChange = (e) => {
        setQuery(e.target.value);
    }

    //그냥 다가져온뒤 필터링을 해야함 
    /* const callAPI = async () => {
        const url = `/memo/${search}`;
        await axios.get(url).then((res) => {
            console.log(url);
            setResSearch(res.data.result);
        });
    }; */

    /* const callAPI = async () => {
        axios.get("/memoList").then((res) => {
          setResult(res.data.result)
        });
    }; */
    
    function onClick(e) {
        e.preventDefault();
        props.changeSearch(query);
    }

    return (
        <SWrapper>            
            <form name="titlesearch" style={styles.form}> 
                <label>
                    <input type="search" style={styles.query} value={query} onChange={onChange}/>
                </label>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.search} />
                <Button title='제출' width='100px' height='40px' left='950px' onClick={onClick}></Button> 
            </form>
        </SWrapper>
    );
}

export default SearchBar;