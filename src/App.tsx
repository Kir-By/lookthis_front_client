import React, {FC, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import './App.css';
import Flyer from './pages/flyer';
import History from './pages/flyer/History';
import Login from './pages/login';
import LoginRedirect from './pages/login/LoginRedirect';
import PointInfo from './pages/myPage/PointInfo';
import { currentPosition } from './states';

declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}


const App: FC = () => {

  const position = useRecoilValue(currentPosition);
  const setCurrentPosition = useSetRecoilState(currentPosition);
  const onMessageHandler = (e:any) => {
    const event = JSON.parse(e.data)
    setCurrentPosition(prev => ({...prev, lat:event.data.lat, lng:event.data.lng}));

    window.ReactNativeWebView.postMessage(JSON.stringify({ currentPosition: position }));
  };

  useEffect(() => {
    const isUIWebView = () => {
      return navigator.userAgent
        .toLowerCase()
        .match(/\(ip.*applewebkit(?!.*(version|crios))/)
    }

    const receiver = isUIWebView() ? window : document

    receiver.addEventListener('message', onMessageHandler)
    return () => {
      receiver.removeEventListener('message', onMessageHandler)
    }
  });

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
