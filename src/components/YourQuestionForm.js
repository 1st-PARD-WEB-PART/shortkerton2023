import React, { useState } from 'react';
import styled from 'styled-components';

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

const Button = styled.button`
  color: #5262f5;
`;

const YourQuestionForm = () => {
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
    console.log(managerData);
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
        <div key={content.id}>
          <H1>{content.name}</H1>
          <Input
            type="text"
            value={content.value}
            onChange={(event) => handleInputChange(event, content.id)}
          />
        </div>
      ))}
      <Button onClick={handleClick}>제출하기</Button>
    </Form>
  );
};

export default YourQuestionForm;
