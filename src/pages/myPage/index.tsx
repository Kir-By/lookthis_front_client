import styled, {css} from 'styled-components';
import userImg from '../../../src/googleUser.png';

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
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 6px;
  overflow: hidden;
`;

const UserInfo = styled.div`
  flex-direction: column;
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

const MenuWrapper = styled.div`
  background-color: #a0a0a0
  min-height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.div`
  width: 100%;
  border-top: 2px solid #696969;
  font-size: 19px;
  color: #000000;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  padding: 20px;
  margin: 0.2px;
  &:last-child {
    border-bottom: 2px solid #696969;
  }
`;

const MyPage = () => {
  return (
    <>
      <Wrapper>
        <Profile>
          <ProfileImg src={userImg} />
          <UserInfo>
            <UserName>name</UserName>
            <UserPoint>150 point</UserPoint>
          </UserInfo>
        </Profile>
        <MenuWrapper>
          <Menu>포인트 사용</Menu>
          <Menu>포인트 내역</Menu>
          <Menu>로그아웃</Menu>
          <Menu>회원탈퇴</Menu>
        </MenuWrapper>
      </Wrapper>
    </>
  );
};

export default MyPage;
