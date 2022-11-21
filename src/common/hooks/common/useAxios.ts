import axios from 'axios';

const useAxios = axios.create({
  // baseURL: 'http://54.180.155.48:8080',
  baseURL: 'https://lookthis-back.nhncloud.paas-ta.com/',
  headers: {
    Accept: 'application/json; charset=UTF-8',
  },
  withCredentials: false,
});

export default useAxios;
