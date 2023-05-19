import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { AddNewAnswer, AddNewAnswerAsNotUser, AddNewQuestion } from '../services/DbService';



const AnswerQuestionForm = ({ user, questionData }) => {
    const [answer, setAnswer] = useState('');
    const [name, setName] = useState('');

    const handleClick = async ({userName}) => {
        let answerDocRef;
        if(user){
            answerDocRef = await AddNewAnswer({ userId: user.uid, questionId: questionData.questionId, answer: answer });
        } else{
            answerDocRef = await AddNewAnswerAsNotUser({userName: userName ?? "anonymous", questionId: questionData.questionId, answer: answer});
        }
    };

    const handleOnChange = (event) => {
        const target = event.target;
        console.log(target.id);
        switch (target.id) {
            case "answer":
                setAnswer(target.value);
                break;
            case "name":
                setName(target.value);
                break;
        }
    }

    return (
        <>
            {questionData.creatorId}의 질문
            {questionData.question}
            <TextField id="answer" label={"answer"} variant="outlined" value={answer} onChange={(event) => handleOnChange(event)} />
            {
                user == null
                ?   <TextField id="name" label={"name"} variant="outlined" value={answer} onChange={(event) => handleOnChange(event)} />
                : <></>
            }

            <Button variant="contained" onClick={handleClick} disabled={user == null}>제출하기</Button>
        </>
    );
};

export default AnswerQuestionForm;
