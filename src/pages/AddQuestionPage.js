import NewQuestionForm from "../components/NewQuestionForm";
import { GetCurrentUser } from "../services/AuthService";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import styled from "styled-components";

const Div = styled.div`
  background: #F5F5F5;
  width: 100%;
  height: 100vh;
`;

const FirstDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const SecondDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 482px;
  padding-left: 500px;
  margin-bottom: 50px;
`;

const Title = styled.p`
  font-family: '210 Gulim';
  font-style: normal;
  font-size: 40px;
  color: #9ABBBE;
  text-align: center;
  padding-top: 5px;
  margin-right: 30px;
`;

const TextButton = styled.button`
  color: #9ABBBE;
  background: none;
  border: none;
  font-size: 16px;
  padding-top: 42px;
  padding-right: 60px;
`;

const FirstText = styled.text`
  width: 514px;
  font-size: 18px;
  display: flex;
  align-items: center;
  color: #757575;
  padding-bottom: 8px;
  margin-right: 130px;
`;

const SecondText = styled.text`
  width: 514px;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #757575;
  padding-bottom: 8px;
  margin-right: 110px;
`;

const ThirdText = styled.text`
  width: 514px;
  font-size: 12px;
  display: flex;
  align-items: center;
  color: #757575;
  text-align: center;
  margin-right: 110px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 100px;
`;

const AddQuestionPage = () => {
  const [userInfo, setUserInfo] = useState(GetCurrentUser());
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserInfo(user);
    })
  });

  return (
    <Div>
      <FirstDiv>
        <TextButton>답변보기</TextButton>
        <TextButton>{userInfo.displayName}</TextButton>
      </FirstDiv>
      <Title>궁그매</Title>
      <SecondDiv>
        <TextWrap>
          <FirstText>궁그매?</FirstText>
          <SecondText>상대방에게 궁금한 질문과 나의 답변을 입력해주세요.</SecondText>
          <ThirdText>링크를 통해 질문을 받은 대상은 질문에 대답하기 전까지 질문자님의 답변을 확인할 수 없습니다.</ThirdText>
        </TextWrap>
      </SecondDiv>
      <NewQuestionForm user={userInfo}></NewQuestionForm>
    </Div>
  );
}

export { AddQuestionPage };
