import styled from 'styled-components';
import NewQuestionForm from "../components/NewQuestionForm";
import { IsLogin } from "../services/AuthService";

const Button = styled.button`
background : white;
`;
function HomePage() {
  return (
    <div>
      <Button onClick={handleGoogleLogin}>로그인</Button>
      <div>
        {IsLogin()
          ? userData.displayName
          : ""}

      </div>
      <NewQuestionForm></NewQuestionForm>
    </div>
  );

}

export default HomePage;

