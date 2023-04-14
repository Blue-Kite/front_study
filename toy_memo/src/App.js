import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import styled from "styled-components";
// Pages
import Main from './pages/Main';
import PostView from './pages/PostView';
import PostWrite from './pages/PostWrite';

function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/*' element={<Main />} />
                <Route path='/PostView' element={<PostView />} />
                <Route path='/PostWrite' element={<PostWrite />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
