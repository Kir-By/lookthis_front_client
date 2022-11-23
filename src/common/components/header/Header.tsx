import {FC} from 'react';
import styled from 'styled-components';
import {Search} from 'react-feather';
import {device} from '../../../common/style/layout/device';
import {Link, useNavigate} from 'react-router-dom';

const StyledHeader = styled.header`
  object-fit: contain;
  width: 100%;
  height: 40px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid whitesmoke;
  margin-left: -1px;
  background: linear-gradient(180deg, rgba(147, 212, 148, 1) 0%, rgba(120, 191, 173, 1) 100%);

  @media ${device.mobile} {
    max-width: 767px;
    & img {
      width: 100%;
    }
  }

  @media ${device.tablet} {
    max-width: 1366px;
    & img {
      width: 100%;
    }
  }

  @media ${device.laptop} {
    max-width: 1679px;
    & img {
      width: 100%;
    }
  }
`;

const StyledHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const StyledHeaderLeftImg = styled.img`
  object-fit: contain;
  height: 80px;
  margin-left: 5px;
`;

const StyledHeaderLeftSpan = styled.span`
  padding: 10px;
  cursor: pointer;
`;

const StyledHeaderMiddle = styled.div`
  display: flex;
  flex: 0.7;
  align-items: center;
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 5px;
`;

const StyledHeaderMiddleInput = styled.input`
  border: none;
  width: 100%;
  padding: 10px;
  outline: none;
  font-size: medium;
  background-color: transparent;
`;

const StyledMaterialIcons = styled.span`
  color: gray;
`;

const StyledHeaderRight = styled.div`
  display: flex;
  padding-right: 20px;
`;

const StyledHeaderRightSpan = styled.span`
  padding: 10px;
  cursor: pointer;
  color: gray;
`;

const HeaderButton = styled.button`
  width: 50px;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  & > p {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
`;

const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <StyledHeaderLeft>
        <StyledHeaderLeftSpan>
          <HeaderButton onClick={() => navigate('/flyer')}>
            <p>LIST</p>
          </HeaderButton>
          {/* <Link to={'/flyer'}>List</Link> */}
        </StyledHeaderLeftSpan>
        <StyledHeaderLeftSpan>
          <HeaderButton onClick={() => navigate('/flyer/history')}>
            <p>HISTORY</p>
          </HeaderButton>
        </StyledHeaderLeftSpan>
        {/* <StyledHeaderLeftImg src="https://i.pinimg.com/originals/ae/47/fa/ae47fa9a8fd263aa364018517020552d.png" /> */}
      </StyledHeaderLeft>

      {/* <StyledHeaderMiddle>
        <StyledMaterialIcons>
          <Search></Search>
        </StyledMaterialIcons>
        <StyledHeaderMiddleInput type="text" placeholder="Search mail" />
        <StyledMaterialIcons className="material-icons"> arrow_drop_down </StyledMaterialIcons>
      </StyledHeaderMiddle> */}

      {/* <StyledHeaderRight>
        <StyledHeaderRightSpan> apps </StyledHeaderRightSpan>
        <StyledHeaderRightSpan> notifications </StyledHeaderRightSpan>
        <StyledHeaderRightSpan> account_circle </StyledHeaderRightSpan>
      </StyledHeaderRight> */}
    </StyledHeader>
  );
};

export default Header;
