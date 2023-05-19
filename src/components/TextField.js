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
`

const TextField = () => {
    const [inputText, setInputText] = useState('');

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
    };

    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    const managerData = [
        {
            id: 1,
            name: '질문',
        },
        {
            id: 2,
            name: '답변',
        },
    ];

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
        setInputText(updatedManagerData.find((content) => content.id === id)?.value || '');
    };

    return (
        <Form>
            {managerData.map((content) => (
                <div key={content.id}>
                    <H1>{content.name}</H1>
                    <Input type="text" value={inputText} onChange={(event) => handleInputChange(event, content.id)} />
                </div>
            ))}
            {/* <Button onClick={handleClick}>제출하기</Button> */}
            <button>제출하기</button>
        </Form>
    );
};

export default TextField;