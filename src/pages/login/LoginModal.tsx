import styled, {css} from 'styled-components';
import {device} from '../../common/style/layout/device';
import React, {Dispatch, SetStateAction, PropsWithChildren, useState, useCallback} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

type LoginModalProps = {
  setOpenLoginModal: Dispatch<SetStateAction<boolean>>;
};

const cursorCss = css`
  cursor: pointer;
`;

const LoginTitle = styled.div`
  margin-bottom: 22px;
  padding-bottom: 25px;
  border-bottom: 1px solid #dbdddf;
`;

const LoginForm = styled.div``;

const LoginLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #3c3e40;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
`;

const LoginInput = styled.input`
  display: block;
  padding: 12px 18px;
  border: 1px solid #c9cccf;
  border-radius: 10px;
  color: #3c3e40;
  font-size: 16px;
  line-height: 1.5;
  place-holder: 입력하세요;
`;

const LoginDiv = styled.div`
  @media ${device.mobile} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 400px;
    padding: 35px;
    border-radius: 27px;
    background: #fff;
    box-shadow: 0 2px 5px rgb(0 0 0 / 13%);
  }
`;

const LoginModalBG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
`;

const LoginAside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
`;

const LoginButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
  margin-left: 20px;
  width: 200px;
`;

const LoginButton = styled.button`
  border-radius: 50px;
  padding: 7.5px 18px;
  background-color: #27d6bc;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  border-color: none;
  ${cursorCss}
`;

const LoginModal = ({props: {setOpenLoginModal}}: PropsWithChildren<{props: LoginModalProps}>) => {
  const navigation = useNavigate();
  // userId input value
  const [userIdValue, setUserIdValue] = useState<string>('');
  const onChangeUserIdValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserIdValue(e.target.value);
    },
    [userIdValue],
  );

  // pw input value
  const [passwordValue, setPasswordValue] = useState<string>('');
  const onChangePasswordValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordValue(e.target.value);
    },
    [passwordValue],
  );

  // login axios setting
  const axiosCreate = axios.create({
    baseURL: 'http://localhost:9090/',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: false,
  });

  const doLoginAPI = useCallback(() => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('userId', userIdValue);
      bodyFormData.append('password', passwordValue);
      axiosCreate.post(`/login/doLogin`, bodyFormData).then(result => navigation(`${result.data}`));
    } catch (error: any) {
      if (error.response.status === 404) {
        const loginUrl = '/oauth2/redirect/';
        const loginPath = error.request.responseURL.split(loginUrl)[1];
        // console.log(loginUrl + loginPath);
        // navigation(loginUrl + loginPath);
      }
    }
  }, [userIdValue, passwordValue]);

  // console.log('userIdValue', userIdValue);
  // console.log('passwordValue', passwordValue);

  return (
    <LoginAside>
      <LoginModalBG onClick={() => setOpenLoginModal(false)} />
      <LoginDiv>
        <LoginTitle>
          <h2>Login</h2>
        </LoginTitle>
        <LoginForm>
          <LoginLabel>ID</LoginLabel>
          <LoginInput onChange={e => onChangeUserIdValue(e)} value={userIdValue}></LoginInput>
        </LoginForm>
        <br />
        <LoginForm>
          <LoginLabel>PASSWORD</LoginLabel>
          <LoginInput type={'password'} onChange={e => onChangePasswordValue(e)} value={passwordValue}></LoginInput>
        </LoginForm>
        <LoginButtonGroup>
          <LoginButton onClick={() => doLoginAPI()}>로그인</LoginButton>
          <LoginButton style={{backgroundColor: 'grey'}} onClick={() => setOpenLoginModal(false)}>
            취소
          </LoginButton>
        </LoginButtonGroup>
      </LoginDiv>
    </LoginAside>
  );
};

export default LoginModal;
