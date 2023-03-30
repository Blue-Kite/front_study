import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import styled from "styled-components";
// Pages
import Main from './pages/Main';

function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Main />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
