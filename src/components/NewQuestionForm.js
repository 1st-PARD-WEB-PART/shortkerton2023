import React, { useState } from 'react';
import styled from 'styled-components';
// import { TextField, Button, Alert } from '@mui/material';
import { AddNewAnswer, AddNewQuestion } from '../services/DbService';
import { GetCurrentUser } from '../services/AuthService';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextField = styled.textarea`
  width: 514px;
  height: 123px;
  background: #FAFAFA;
  border: 1px solid #9ABBBE;
  border-radius: 15px;
`;

const SmallText = styled.p`
  font-size: 12px;
  color: #9ABBBE;
  padding-top: 20px;
  padding-left: 500px;
`;

const Padding = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  background: #9ABBBE;
  border-radius: 50px;
  width: 120px;
  height: 48px;
  border: none;
  color: white;
  font-size: 16px;
`;


const NewQuestionForm = ({ user }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleClick = async() => {
    const questionDocRef = await AddNewQuestion({userId: user.uid, question: question});
    const answerDocRef = await AddNewAnswer({userId: user.uid, questionId: questionDocRef.id, answer: answer});
  };

  const handleOnChange = (event) => {
    const target = event.target;
    console.log(target.id);
    switch (target.id) {
      case "question":
        setQuestion(target.value);
        break;
      case "answer":
        setAnswer(target.value);
        break;
    }
  }

  return (
    <>
      <SmallText>질문 입력</SmallText>
      <Div>
        <TextField id="question" variant="outlined" value={question} onChange={(event) => handleOnChange(event)} />
      </Div>
      <SmallText>나의 답변 입력</SmallText>
      <Div>
        <TextField id="answer" variant="outlined" value={answer} onChange={(event) => handleOnChange(event)} />
        <Padding></Padding>
        <Button variant="contained" onClick={handleClick} disabled={user == null}>저장하기</Button>
      </Div>
    </>
  );
};

export default NewQuestionForm;
