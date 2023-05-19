import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, Alert } from '@mui/material';
import { AddNewAnswer, AddNewQuestion } from '../services/DbService';
import { GetCurrentUser } from '../services/AuthService';

const Form = styled.form`
  position: absolute;
  width: 352px;
  height: 318px;
  border-radius: 10px;
  background-color: #ffffff;
`;

const H1 = styled.h1`
  color: #5262f5;
`;

const Input = styled.input`
  color: #5262f5;
`;


const NewQuestionForm = ({user}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleClick = async() => {
    const questionDocRef = await AddNewQuestion({userId: user.uid, question: question});
    const answerDocRef = await AddNewAnswer({userId: user.uid, questionId: questionDocRef.id, answer: answer});
    console.log("question: " + questionDocRef);
    console.log("answer: " + answerDocRef);
  };

  const handleOnChange = (event) => {
    const target = event.target;
    console.log(target.id);
    switch(target.id){
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
      <TextField id="question" label={"question"} variant="outlined" value={question} onChange={(event) => handleOnChange(event)} />
      <TextField id="answer" label={"answer"} variant="outlined" value={answer} onChange={(event) => handleOnChange(event)} />
      <Button variant="contained" onClick={handleClick} disabled = {user == null}>제출하기</Button>
    </>
  );
};

export default NewQuestionForm;
