import React, {FC} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Flyer from './pages/flyer';
import History from './pages/flyer/History';
import Login from './pages/login';
import LoginRedirect from './pages/login/LoginRedirect';
import PointInfo from './pages/myPage/PointInfo';

const App: FC = () => {
  console.log('test2');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/myPage/pointInfo" element={<PointInfo />} />
          <Route path="/flyer" element={<Flyer />} />
          <Route path="/flyer/history" element={<History />} />
          <Route path="/oauth2/redirect/:id" element={<LoginRedirect />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
