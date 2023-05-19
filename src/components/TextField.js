import React, { useState } from 'react';

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
        <div>
            <input type="text" value={text} placeholder='입력해주세요' onChange={handleChange} />
            <button onClick={handleClick}>제출하기</button>
        </div>
    );
};

export default TextField;
