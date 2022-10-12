import React, {FC} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Layout from './common/components/layout/Layout';
import Login from './pages/login';
import MyPage from './pages/myPage';

const App: FC = () => {
  console.log('test2');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
