import React, { useEffect, useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
<<<<<<< HEAD
import { AddNewAnswer, AddNewAnswerAsNotUser, AddNewQuestion, ReadAllAnswerOfQuestion, ReadUserByUid } from '../services/DbService';
=======
import { AddNewAnswer, AddNewAnswerAsNotUser, AddNewQuestion, ReadAllAnswerOfQuestion, DidAnswer } from '../services/DbService';
>>>>>>> refs/remotes/origin/main
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AnswerQuestionForm = ({ user, questionData }) => {
    const [answer, setAnswer] = useState('');
    const [name, setName] = useState('');
    const [hisAnswer, setHisAnswer] = useState('');
<<<<<<< HEAD
    const [creator, setCreator] = useState(null);

    const fetchAnswerData = async () => {
        if(questionData == null) return;
        console.log(questionData.creatorId);
        console.log(questionData.questionId);
        // const foundedAnswerData = await ReadAllAnswerOfQuestion({ userId: questionData.creatorId, questionId: questionData.questionId });
        // console.log(foundedAnswerData);
        // const answerData = foundedAnswerData.data();
        // setHisAnswer(answerData == null ? null : answerData.answer);

        setHisAnswer("너는 여행할 때 어떤 유형이야?");
=======
    const [alreadyAnswered, setAlreadyAnswered] = useState('');

    const fetchAnswerData = async () => {
        if (questionData == null) return;
        const foundedAnswerData = await ReadAllAnswerOfQuestion({ userId: questionData.creatorId, questionId: questionData.questionId });
        console.log(foundedAnswerData);
        setHisAnswer(foundedAnswerData == null ? null : foundedAnswerData.answer);
>>>>>>> refs/remotes/origin/main
    }

    useEffect(() => {
        fetchAnswerData();
<<<<<<< HEAD
=======
        const checkAnswer = async () => {
            const answered = await DidAnswer({
                userId: questionData.creatorId,
                questionId: questionData.questionId,
            });
            setAlreadyAnswered(answered);
        };

>>>>>>> refs/remotes/origin/main
    }, [])

    const handleClick = async () => {
        if (!questionData) {
            console.log("question data is null");
            return;
        }
        let answerDocRef;
        if (user) {
            answerDocRef = await AddNewAnswer({ user: user, questionId: questionData.questionId, answer: answer });
        } else {
            answerDocRef = await AddNewAnswerAsNotUser({ userName: name ?? "anonymous", questionId: questionData.questionId, answer: answer });
        }
    };

    const handleOnChange = (event) => {
        const target = event.target;
        switch (target.id) {
            case "answer":
                setAnswer(target.value);
                break;
            case "name":
                setName(target.value);
                break;
            case "hisAnswer":
                setHisAnswer(target.value);
                break;
        }
    }


    const Wrap = styled.div`
        width: 444px;
        height: 603px;
        background-color: #FACCDA;
        justify-content: center;
        border-radius: 40px;
        /* margin-bottom: 50px; */
    `

    const Name = styled.div`
        font-family: '210 Gulim';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 157.52%;
        text-align: center;
        color: #FFFFFF;
        margin-top: 30px;
    `

    const Q = styled.div`
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 280%;
        text-align: center;
        letter-spacing: -0.006em;
        color: #757575;
        margin-top: 10px;
    `

    const HisAnswer = styled.div`
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 17px;
        text-align: center;
        letter-spacing: -0.006em;
        color: #000000;
`
    const Induce = styled.div`
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 7px;
        line-height: 17px;
        text-align: center;
        letter-spacing: -0.006em;
        color: #C99FA9;
        margin-top: 170px;
    `

    const AWrap = styled.div`
        align-items: center;
        margin-top: 40px;
        margin-left: 55px;
    `
    const SWrap = styled.div`
        align-items: center;
        margin-top: -230px;
        margin-left: 170px;
    `

    const NWrap = styled.div`
        width:182px;
        height:31px;
        margin-bottom: -20px;
    `

    const Cloud = styled.svg`
        width: 20px;
        height: 20px;
        fill: none;
        margin-left: 29px;
        margin-top: 10px;
    `

    const StyledPath = styled.path`
        stroke: white;
    `;

    return (
        <Wrap> {
            questionData == null
                ? <>cannot find question data</>
                : <>
                    <div>
                        {/* <Cloud width="20" height="20" viewBox="0 0 20 20"/>
                            <StyledPath d="M19.1906 0.5L10.3088 0.5L0.80901 19.5H9.69077L19.1906 0.5Z" /> */}
                        <Name>{questionData.creatorId}의 질문</Name><br></br>
                    </div>
                    <Q>Q.<br></br>{questionData.question}</Q>
                    <br></br>
                    {/* { } */}
                    <HisAnswer>{hisAnswer}</HisAnswer>
                    {/* <HisAnswer>테스트</HisAnswer> */}
                    <br></br>
                    <Induce>{questionData.creatorId}님의 답변을 보려면 나의 답변을 작성해주세요!</Induce>
                    <AWrap>
                        <TextField id="answer" label={"답변입력하기"} variant="outlined" value={answer} onChange={(event) => handleOnChange(event)} sx={{ width: '340px', height: "300px" }} />
                        {
                            user == null
                                ? <NWrap><TextField id="name" label={"이름 혹은 닉네임 입력"} variant="outlined" value={name} onChange={(event) => handleOnChange(event)} /></NWrap>
                                : <></>
                        }
                    </AWrap>
                    <br></br>
                    <SWrap>
                        <Link to="/home">
                            <Button variant="contained" onClick={handleClick} disabled={user != null ? (answer == '') : (answer == '' || name == '')}>답변 보내기</Button>
                        </Link>
                    </SWrap>
                </>
        }
        </Wrap>
    );
};

export default AnswerQuestionForm;
