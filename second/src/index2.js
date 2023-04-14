import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './강의수강용/Library';
import Clock from './강의수강용/Clock';
import Comment from './강의수강용/Comment';
import CommentList from './강의수강용/CommentList';
import NotificationList from './강의수강용/NotificationList';
import Accommodate from './강의수강용/Accommodate';
import ConfirmButton from './강의수강용/ConfirmButton';
import LandingPage from './강의수강용/LandingPage';
import AttendanceBook from './강의수강용/AttendanceBook';
import SignUp from './강의수강용/SignUp';
import Calculator from './강의수강용/Calculator';
import ProfileCard from './강의수강용/ProfileCard';
import DarkOrLight from './강의수강용/DarkOrLight';
import Blocks from './강의수강용/Blocks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Blocks />
  </React.StrictMode>
);

/*
setInterval(() => {
  root.render(
    <React.StrictMode>
      <Clock/>
    </React.StrictMode>, 
    document.getElementById('root')
  );
}, 1000);*/



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
