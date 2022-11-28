/* eslint-disable no-extra-boolean-cast */
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {Database} from 'react-feather';
import {useQuery} from 'react-query';
import styled, {css} from 'styled-components';
import userImg from '../../../src/googleUser.png';
import {getPointHistoryList, getUser} from '../../common/apis/user';
import Header from '../../common/components/header/Header';

dayjs.locale('ko');

type User = {
  userId: string;
  password?: string;
  plateformtype?: null;
  accesstoken?: null;
  name: string;
  birth?: null;
  createDate?: null;
  updateDate?: null;
  point: number;
  phone?: null;
  removed?: null;
  fcmToken?: string;
};

type Point = {
  user_id: string;
  spotId: number;
  spotName: string;
  storeId: number;
  storeName: string;
  flyerId: number;
  createDate: string;
  status: number;
  point: number;
  oid: number;
};

type PointValuePropType = {
  plusMinus: boolean;
};

const SignitureBackground = css`
  background: linear-gradient(180deg, rgba(147, 212, 148, 1) 0%, rgba(120, 191, 173, 1) 100%);
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlignDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  min-height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Profile = styled.div`
  min-height: 200px;
  margin-top: 50px;
  width: inherit;
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 6px;
  overflow: hidden;
  text-align: center;
`;

const UserInfo = styled.div`
  flex-direction: column;
  justify-content: center;
  width: inherit;
  margin: 0 auto;
`;

const UserName = styled.h4`
  font-size: 28px;
  line-height: 1;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.87);
  margin-top: 15px;
`;

const UserPoint = styled.h6`
  font-weight: 600;
  font-size: 15px;
  line-height: 1;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.87);
  margin-top: -20px;
`;

const PointWrapper = styled.div`
  background-color: #a0a0a0
  min-height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DateButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const PointTitle = styled.div`
  width: 100%;
  font-size: 17px;
  color: #000000;
  font-weight: 900;
  text-align: start;
  text-decoration: none;
  padding: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: center;

  & > svg {
    margin-right: 10px;
    margin-bottom: -6px;
  }

  & > div {
    display: flex;
    justify-content: space-around;
    margin: 5px;
  }

  & > div > button {
    margin-right: -5px;
    color: grey;
  }
`;

const PointStore = styled.div``;

const PointDate = styled.div`
  padding: 5px 0 0 0;
  color: grey;
  font-size: 13px;
`;

const PointValue = styled.div`
  padding-right: 20px;
  color: #1fd771;
  color: ${(prop: PointValuePropType) => (prop.plusMinus ? '#1fd771' : '#f60')};
`;

const Point = styled.div`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 15px;
  color: #000000;
  font-weight: 700;
  text-decoration: none;
  padding: 20px;
  margin: 0.2px;
  &:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 25px;
`;

const MyPage = () => {
  // user정보 받기
  const userInfo = JSON.parse(sessionStorage.getItem('user') || '{}');
  const getUserParam = {userId: userInfo?.userId, name: userInfo?.name};

  const {data: user} = useQuery<User | undefined>({
    queryKey: ['userInfo', userInfo?.userId],
    queryFn: () => getUser(JSON.stringify(getUserParam)),
    enabled: !!userInfo,
  });
  console.log('user', user);

  // 날짜 관련
  const now = dayjs();

  const [wishDate, setWishDate] = useState(now.add(-1, 'week').format('YYYY-MM-DD'));

  const aWeekAgo = now.add(-1, 'week').format('YYYY-MM-DD');
  const aMonthAgo = now.add(-1, 'month').format('YYYY-MM-DD');
  const threeMonthsAgo = now.add(-3, 'month').format('YYYY-MM-DD');

  // 포인트 리스트 관련
  const getPointHistoryListParam = {userId: userInfo?.userId, searchDate: wishDate};

  const {data: pointHistoryList} = useQuery<Point[] | undefined>({
    queryKey: ['pointHistoryList', userInfo?.userId],
    queryFn: () => getPointHistoryList(JSON.stringify(getPointHistoryListParam)),
    enabled: !!userInfo,
  });

  return (
    <>
      <Header />
      <Wrapper>
        <Profile>
          <CenterDiv>
            <ProfileImg src={userImg} />
          </CenterDiv>
          <CenterDiv>
            <UserInfo>
              <CenterDiv>
                <UserName>{user?.name}</UserName>
              </CenterDiv>
              <CenterDiv>
                <UserPoint>{user?.point} points</UserPoint>
              </CenterDiv>
            </UserInfo>
          </CenterDiv>
        </Profile>
        <PointWrapper>
          <PointTitle>
            <div>
              <Database />
              포인트 사용 내역
            </div>
            <div>
              <DateButton onClick={() => setWishDate(aWeekAgo)}>1 week</DateButton>
              <DateButton onClick={() => setWishDate(aMonthAgo)}>1 month</DateButton>
              <DateButton onClick={() => setWishDate(threeMonthsAgo)}>3 months</DateButton>
            </div>
          </PointTitle>

          {pointHistoryList?.map(point => (
            <React.Fragment key={point?.flyerId}>
              <Point>
                <AlignDiv style={{padding: '0 0 0 15px'}}>
                  <PointStore>{point?.storeName}</PointStore>
                  <PointDate>({point?.createDate?.slice(0, 10)})</PointDate>
                </AlignDiv>
                <PointValue plusMinus={!!point?.status}>
                  {(!!point?.status ? '+' : '-') + point?.point} points {!!point?.status ? '적립' : '사용'}
                </PointValue>
              </Point>
            </React.Fragment>
          ))}
        </PointWrapper>
      </Wrapper>
    </>
  );
};

export default MyPage;
