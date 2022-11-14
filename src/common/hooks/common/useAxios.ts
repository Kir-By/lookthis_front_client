import axios from 'axios';

const useAxios = axios.create({
  baseURL: 'http://54.180.155.48:8080',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json; charset=UTF-8',
  },
  withCredentials: true,
});

export default useAxios;
