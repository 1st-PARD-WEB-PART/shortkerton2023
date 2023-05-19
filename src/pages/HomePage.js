import styled from 'styled-components';
import { GetCurrentUser, GoogleLogin, IsLogin, Logout } from "../services/AuthService";
import { useState } from 'react';
import HomeImage from '../assets/img/home.svg';

const Wrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  background : none;
  border : none;
  color : #9ABBBE;
  font-size: 12px;
  padding : 40px;
  position: absolute;
  left: 630px;
  top: 600px;
`;

const Image = styled.img`
  width: 100%;
  max-height: 100vh;
`;

const ButtonQ = styled.button`
  width: 260px;
  height: 56px;
  background: #FAFAFA;
  border : none;
  border-radius: 50px;
  color : #9ABBBE;
  font-size: 20px;
  position: absolute;
  left: 620px;
  top: 501px;

`;

const HomePage = () => {
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = async () => {
    const user = await GoogleLogin();
    console.log(user);
    setUserInfo(user);
  };

  const handleLogout = async () => {
    await Logout();
    console.log("logout");
    setUserInfo(null);
  };
  
  return (
    <Wrapper>
      <Image src={HomeImage} alt="OnBoarding" />

        <Button onClick={IsLogin() ? handleLogout : handleLogin} >{IsLogin() ? "로그아웃" : "질문을 만드려면 로그인을 하세요>"}</Button>

        <ButtonQ>질문만들기</ButtonQ>
    </Wrapper>
  );

}

export default HomePage;

