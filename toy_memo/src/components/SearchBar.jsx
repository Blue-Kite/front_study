import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 

const SWrapper = styled.div`
    
    display: flex;
    justify-content: center;
    
    position: absolute;
    left: 125px;
    top: 30px;
`;

const styles = {
    form: {
        position: "relative"
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
    },
    //style={styles.wrapper} <button id = "query_btn" type="submit">제출</button>
};

function SearchBar(props) {
    return (
        <SWrapper>            
            <form name="titlesearch" style={styles.form}> 
                <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.search} />
                <label>
                    <input type="search" id="query" class="query_text" style={styles.query} />
                </label>
                
            </form>
        </SWrapper>
    );
}

export default SearchBar;