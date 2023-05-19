import styled from 'styled-components';
import { GetCurrentUser, GoogleLogin, IsLogin, Logout } from "../services/AuthService";
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import HomeImage from '../assets/img/home.svg';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  margin-bottom:100px;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #9ABBBE;
  font-size: 12px;
  padding: 20px 40px;
  height: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: 300px;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  border: 2px solid #9ABBBE;
  border-radius: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 10px; 
`;

const Image = styled.img`
  width: 100%;
  max-height: 100vh;
`;

const ButtonQ = styled.button`
  width: 260px;
  height: 56px;
  background: #FFFFFF;
  border: 2px solid #9ABBBE;
  border-radius: 50px;
  color: #9ABBBE;
  font-size: 20px;
  position: absolute;
  left: 50%;
  top: 70%;
  margin-top: -40px;
  transform: translate(-50%, -50%);
`;

const HomePage = () => {
  const [userInfo, setUserInfo] = useState(GetCurrentUser());
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserInfo(user);
    });
  }, []);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/NewQuestion');
  };

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

      <Button onClick={IsLogin() ? handleLogout : handleLogin}>
        {IsLogin() ? "로그아웃" : "질문을 만드려면 로그인을 하세요>"}
      </Button>

      <ButtonQ onClick={userInfo ? handleNavigate : handleLogin}>질문만들기</ButtonQ>
    </Wrapper>
  );
};

export default HomePage;
