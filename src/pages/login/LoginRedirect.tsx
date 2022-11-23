import {useParams} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {useRecoilState} from 'recoil';
import {userState} from '../../states';
import {useEffect, useState} from 'react';

type JWTUser = {
  exp: number;
  iat: number;
  name: string;
  sub: string;
  userId: string;
};

type User = {
  name: string;
  userId: string;
  params: string;
};

const LoginRedirect = () => {
  const params = useParams();
  const userId: string = params.id || '';

  const decodedJWT: JWTUser = jwt_decode(userId);
  const user: User | null = {name: decodedJWT?.name, userId: decodedJWT?.userId, params: params.id || ''};

  console.log('user', user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (decodedJWT) {
      if (isLoaded) {
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/flyer';
      } else {
        setIsLoaded(true);
      }
    }
  }, [isLoaded]);

  return (
    <>
      <div>로그인 중입니다...</div>
    </>
  );
};

export default LoginRedirect;
