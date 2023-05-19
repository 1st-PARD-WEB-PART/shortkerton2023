import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import { AddNewQuestion } from '../services/DbService';
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


const NewQuestionForm = () => {
  const [managerData, setManagerData] = useState([
    {
      id: 1,
      name: '질문을 입력하세요',
      value: '',
    },
    {
      id: 2,
      name: '답변을 입력하세요',
      value: '',
    },
  ]);

  const handleClick = () => {
  };

  const handleInputChange = (event, id) => {
    const updatedManagerData = managerData.map((content) => {
      if (content.id === id) {
        return {
          ...content,
          value: event.target.value,
        };
      }
      return content;
    });

    setManagerData(updatedManagerData);
  };

  return (
    <Form>
      {managerData.map((content) => (
        <div key={content.id} style={{margin: "20px 0px"}}>
          <TextField id="outlined-basic" label={content.name} variant="outlined" value={content.value} onChange={(event) => handleInputChange(event, content.id)} />
        </div>
      ))}
      <Button variant="contained" onClick={handleClick} disabled = {GetCurrentUser() == null}>제출하기</Button>
    </Form>
  );
};

export default NewQuestionForm;
