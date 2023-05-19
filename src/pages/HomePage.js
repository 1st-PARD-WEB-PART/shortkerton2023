import styled from 'styled-components';
import NewQuestionForm from "../components/NewQuestionForm";
import { GetCurrentUser, GoogleLogin, IsLogin, Logout } from "../services/AuthService";
import { useState } from 'react';

const Button = styled.button`
background : white;
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
    <div>
      <Button onClick={handleLogin}>로그인</Button>
      <Button onClick={handleLogout}>로그인아웃</Button>
      <div>
        {IsLogin()
          ? GetCurrentUser().displayName
          : ""}

      </div>
      <NewQuestionForm></NewQuestionForm>
    </div>
  );

}

export default HomePage;

