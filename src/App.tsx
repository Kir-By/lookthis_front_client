import React, {FC} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Flyer from './pages/flyer';
import History from './pages/flyer/History';
import Login from './pages/login';
import MyPage from './pages/myPage';

const App: FC = () => {
  console.log('test2');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/flyer" element={<Flyer />} />
          <Route path="/flyer/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
