import axios from 'axios';

type User = {
  name: string;
  userId: string;
  params: string;
};

// user정보 받기
const userInfo = JSON.parse(sessionStorage.getItem('user') || '{}');
const JWTToken = userInfo?.params;

const useAxios = axios.create({
  // baseURL: 'http://54.180.155.48:8080',
  baseURL: 'https://lookthis.co.kr/',
  headers: {
    Accept: 'application/json; charset=UTF-8',
    Authorization: 'Bearer ' + JWTToken,
  },
  withCredentials: true,
});

export default useAxios;
