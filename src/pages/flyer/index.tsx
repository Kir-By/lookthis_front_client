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

const UserEmail = styled.h6`
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
`;

const Menu = styled.div``;

const Flyer = () => {
  return (
    <>
      <Wrapper>
        <Profile>
          <ProfileImg src={userImg} />
          <UserInfo>
            <UserName>name</UserName>
            <UserEmail>email</UserEmail>
          </UserInfo>
        </Profile>
        <MenuWrapper>
          <Menu>dd</Menu>
        </MenuWrapper>
      </Wrapper>
    </>
  );
};

export default Flyer;
