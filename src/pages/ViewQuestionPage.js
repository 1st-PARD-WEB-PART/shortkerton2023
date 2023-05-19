import styled from "styled-components";
import { GetCurrentUser} from "../services/AuthService";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

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
    const [question, setQuestion] = useState();

    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate('/NewQuestion');
    };

    return (
        <>
        
        <FirstDiv>
            <TextButton>답변보기</TextButton>
            <TextButton>{userInfo.displayName}</TextButton>
        </FirstDiv>
        <Div>
            <Box>
                <SaveText> 저장되었습니다! </SaveText>
                <QText>Q.</QText>
                <QuestionText>{question}</QuestionText>
                <LinkButton>링크 복사하기</LinkButton>
                <EndButton onClick={handleNavigate}>닫기</EndButton>
            </Box>
        </Div>
        </>
    );
}
export default ViewQuestion;