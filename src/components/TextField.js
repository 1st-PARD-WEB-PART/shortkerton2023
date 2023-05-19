import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
    position: absolute;
    width: 352px;
    height: 318px;
    border-radius: 10px;
    background-color: #ffffff;
`

const TextField = () => {
    const [text, setText] = useState('');

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <Form>
            <h1>질문을 입력하시오</h1>
            <input type="text" value={text} placeholder='질문을 입력해주세요' onChange={handleChange} />
            <h1>답변을 입력하시오</h1>
            <input type="text" value={text} placeholder='답변을 입력해주세요' onChange={handleChange} />
            <br></br>
            <button onClick={handleClick}>제출하기</button>
        </Form>
    );
};

export default TextField;
