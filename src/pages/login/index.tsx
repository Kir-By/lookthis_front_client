import styled, {css} from 'styled-components';
import backImg from '../../test.png';

const Wrapper = styled.div`
  // background-color: #8bd298;
  // background-color: #B6EDB6;
  background-image: url(${backImg})
`;
const AlignCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.div`
  padding: 20px;
  height: 300px;
  ${AlignCenter}
`;

const LoginDiv = styled.div`
  padding-bottom: 50px;
  height: 100px;
  ${AlignCenter}
  flex-direction:column;

  &:last-child > input {
    &:first-child {
      border-radius: 6px 6px 0 0;
    }
    &:nth-child(2) {
      border-radius: 0 0 6px 6px;
    }
  }
`;

const LoginInput = styled.input`
  border: 1px solid #dadada;
  box-shadow: none;
  padding: 14px 17px 13px;
  box-sizing: border-box;
`;

const LoginNaver = styled.a`
  width: 205px;
  padding: 15px 0;
  margin-top: 11px;
  background-color: #19ce60;
  border: 1px solid #15c654;
  border-radius: 6px;
  font-size: 13px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
`;

const Login = () => {
  const {data: typeData} = {data: 'test'};
  console.log(typeData);

  return (
    <>
      <Wrapper>
        <Logo id="login_logo">
          <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="" />
        </Logo>
        <LoginDiv id="loginSection">
          <LoginInput alt="" placeholder="Input ID" />
          <LoginInput alt="" placeholder="Input Password" />
          {/* <input alt="" type="color"/> */}
          <LoginNaver
            href="https://nid.naver.com/nidlogin.login?mode=form&amp;url=https%3A%2F%2Fwww.naver.com"
            className="link_login"
            data-clk="log_off.login"
          >
            <i className="ico_naver">
              <span className="blind">네이버 </span>
            </i>
            로그인
          </LoginNaver>
        </LoginDiv>
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
