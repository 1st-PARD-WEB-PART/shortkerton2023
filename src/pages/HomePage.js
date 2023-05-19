import styled from 'styled-components';
import NewQuestionForm from "../components/NewQuestionForm";
import { GetCurrentUser, GoogleLogin, IsLogin } from "../services/AuthService";

const Button = styled.button`
background : white;
`;
const HomePage = async () => {
  return (
    <div>
      <Button onClick={await GoogleLogin()}>로그인</Button>
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

