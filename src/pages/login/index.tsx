import {useState, Dispatch, SetStateAction} from 'react';
import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import naverLogo from '../../naverLogo2.png';
import lookthisLogo from '../../lookthisLogo3.png';
import lookthisLogoLogin from '../../lookthisLogo.png';
import LoginModal from './LoginModal';
// import backImg from '../../test.png';

type loginModalParamType = {
  setOpenLoginModal: Dispatch<SetStateAction<boolean>>;
};

const Wrapper = styled.div`
  // background-color: #03C75A;
  // background-color: #8bd298;
  // background-color: #B6EDB6;
  // background-image: url(${''})
  // background: linear-gradient(150deg, #03c75a, white);
  background: linear-gradient(180deg, rgba(147, 212, 148, 1) 0%, rgba(120, 191, 173, 1) 100%);
  min-width: 280px;
  height: 837px;
  max-height: 837px;
`;
const AlignCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const limitSize = css`
  max-width: 260px;
  min-width: 170px;
`;
const Logo = styled.div`
  padding: 20px;
  height: 400px;
  ${AlignCenter}

  &:first-child > img {
    width: 100%;
    ${limitSize}
}
  }
`;

const LoginDiv = styled.div`
  padding-bottom: 50px;
  height: 100px;
  ${AlignCenter}
  flex-direction:column;
`;

const LoginNaver = styled.button`
  background-color: #fff;
  color: #03c75a;
  width: 100%;
  height: 50px;
  padding: 12px 20px;
  margin-bottom: 10px;
  border-radius: 12px;
  letter-spacing: -0.14px;
  position: relative;
  border-color: #fff;
  cursor: pointer;
  ${limitSize}
  ${AlignCenter}

  & > div > img {
    width: 45px;
    height: 45px;
    margin-left: -15px;
  }

  & > div > p {
    font-size: 18px;
    font-weight: 800;
    margin-left: 15px;
  }
`;

const NormalLogin = styled.button`
  background-color: #fff;
  width: 85vw;
  height: 50px;
  padding: 12px 20px;
  margin-bottom: 10px;
  border-radius: 12px;
  letter-spacing: -0.14px;
  position: relative;
  border-color: #fff;
  cursor: pointer;
  ${limitSize}
  ${AlignCenter}

  & > div > img {
    height: 65px;
    margin-left: -15px;
  }

  & > div > p {
    font-size: 18px;
    font-weight: 800;
    margin-right: 15px;
    color: rgb(39, 214, 188);
  }
`;

const Login = () => {
  // 로그인 모달 오픈 state
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  // 로그인 링크 이동 함수
  const onLoginNaver = () => {
    window.location.href = 'http://localhost:9090/oauth2/authorization/naver';
  };

  const props = {
    setOpenLoginModal,
  };

  return (
    <>
      <Wrapper>
        <Logo id="login_logo">
          <img src={lookthisLogo} alt="" />
        </Logo>
        <LoginDiv id="loginSection">
          {/* <LoginInput alt="" placeholder="Input ID" />
          <LoginInput alt="" placeholder="Input Password" /> */}
          {/* <input alt="" type="color"/> */}
          <LoginNaver onClick={() => onLoginNaver()}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src={naverLogo} />
              <p style={{borderColor: '#03c75a'}}>네이버로 시작하기</p>
            </div>
          </LoginNaver>
          <NormalLogin onClick={() => setOpenLoginModal(true)}>
            <div style={{width: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <img src={lookthisLogoLogin} />
              <p>회원 로그인</p>
            </div>
          </NormalLogin>
        </LoginDiv>
        {openLoginModal && <LoginModal props={props} />}
      </Wrapper>

      {/* <div className="panel_inner" role="tabpanel" aria-controls="loinid">
        <div className="id_pw_wrap">
          <div className="input_row" id="id_line">
            <div className="icon_cell" id="id_cell">
              <span className="icon_id">
                <span className="blind">아이디</span>
              </span>
            </div>
            <input
              alt=""
              type="text"
              id="id"
              name="id"
              placeholder="아이디"
              title="아이디"
              className="input_text"
              maxLength={41}
              value=""
            />
            <span role="button" className="btn_delete" id="id_clear">
              <span className="icon_delete">
                <span className="blind">삭제</span>
              </span>
            </span>
          </div>
          <div className="input_row" id="pw_line">
            <div className="icon_cell" id="pw_cell">
              <span className="icon_pw">
                <span className="blind">비밀번호</span>
              </span>
            </div>
            <input
              alt=""
              type="password"
              id="pw"
              name="pw"
              placeholder="비밀번호"
              title="비밀번호"
              className="input_text"
              maxLength={41}
            />
            <span role="button" className="btn_delete" id="pw_clear">
              <span className="icon_delete">
                <span className="blind">삭제</span>
              </span>
            </span>
          </div>
        </div>
        <div className="login_keep_wrap" id="login_keep_wrap">
          <div className="keep_check">
            <input alt="" type="checkbox" id="keep" name="nvlong" className="input_keep" value="off" />
            <label htmlFor="keep" className="keep_text">
              로그인 상태 유지
            </label>
          </div>
          <div className="ip_check">
            <a href="/login/ext/help_ip3.html" target="_blank" id="ipguide" title="IP보안">
              <span className="ip_text">IP보안</span>
            </a>
            <span className="switch">
              <input alt="" type="checkbox" id="switch" className="switch_checkbox" value="off" />
              <label htmlFor="switch" className="switch_btn">
                <span className="blind" id="switch_blind">
                  on
                </span>
              </label>
            </span>
          </div>
        </div>

        <div className="login_error_wrap" id="err_capslock">
          <div className="error_message">
            <strong>CapsLock</strong>이 켜져 있습니다.
          </div>
        </div>

        <div className="login_error_wrap" id="err_empty_id">
          <div className="error_message">
            <strong>아이디</strong>를 입력해 주세요.
          </div>
        </div>

        <div className="login_error_wrap" id="err_empty_pw">
          <div className="error_message">
            <strong>비밀번호</strong>를 입력해 주세요.
          </div>
        </div>
        <div className="login_error_wrap" id="err_common">
          <div className="error_message"></div>
        </div>
        <div className="btn_login_wrap">
          <button type="submit" className="btn_login" id="log.login">
            <span className="btn_text">로그인</span>
          </button>
        </div>
      </div> */}
    </>
  );
};

export default Login;
