import styled from "styled-components";
import { GetCurrentUser } from "../services/AuthService";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { ReadQuestion, ReadUserByUid } from "../services/DbService";

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 105px;
`;
const FirstDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;
const TextButton = styled.button`
    color : #9ABBBE;
    background : none;
    border : none;
    font-size: 16px;
    padding-top: 42px;
    padding-right: 60px;
`;

const Box = styled.div`
    width: 514px;
    height: 630px;
    background: #C0D9DC;
    border-radius: 50px;
`;

const SaveText = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 20px;
    padding-top: 45px;
`;

const QText = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #757575;
    padding-top: 91px;
    font-size: 24px;
`;

const QuestionText = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #757575;
    padding-top: 10px;
    font-size: 24px;
`;

const LinkButton = styled.button`
    margin-left : 208px;
    width: 120px;
    height: 48px;
    color: #9E9E9E;
    margin-top: 150px;
    font-size: 16px;
    background: #EEEEEE;
    border-radius: 50px;
    border: none;
`;
const EndButton = styled.button`
    margin-left : 208px;
    width: 120px;
    height: 48px;
    color: #FAFAFA;
    margin-top: 29px;
    font-size: 16px;
    background: #9ABBBE;
    border-radius: 50px;
    border: none;
`;


const ViewQuestion = () => {
    const [userInfo, setUserInfo] = useState(GetCurrentUser());
    const [question, setQuestion] = useState(null);
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const { questionId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                ReadQuestion({ questionId: questionId }).then((question) => {
                    setQuestion(question);
                    ReadUserByUid({ userId: question.creatorId }).then((creator) => {
                        setCreator(creator);
                        setLoading(false);
                    })
                })
                // if (question == null) {
                //     console.log("reading question...");
                //     const foundedQuestion = await ReadQuestion({ questionId: questionId });
                //     setQuestion(foundedQuestion);
                // }
                // if (question != null) {
                //     console.log("reading creator...");
                //     const foundedCreator = await ReadUserByUid({ userId: question.creatorId });
                //     setCreator(foundedCreator);
                // }
                // if (question != null && creator != null) {
                //     setLoading(false);
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userInfo]);


    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/NewQuestion');
    };

    return (
        <>
            {loading
                ? <div>loading...</div>
                : <div>
                    <FirstDiv>
                        <TextButton>답변보기</TextButton>
                        <TextButton>{creator.name ?? "익명"}</TextButton>
                    </FirstDiv>
                    <Div>
                        <Box>
                            <SaveText> 저장되었습니다! </SaveText>
                            <QText>Q.</QText>
                            <QuestionText>{question.question}</QuestionText>
                            <LinkButton>링크 복사하기</LinkButton>
                            <EndButton onClick={handleNavigate}>닫기</EndButton>
                        </Box>
                    </Div>
                </div>
            }

        </>
    );
}
export default ViewQuestion;