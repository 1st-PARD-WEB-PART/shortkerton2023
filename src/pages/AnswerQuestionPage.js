import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReadQuestion } from "../services/DbService";
import AnswerQuestionForm from "../components/AnswerQuestionForm";
import { GoogleLogin, Logout } from "../services/AuthService";
import { auth } from '../firebase';
import { Button } from "@mui/material";
import styled from "styled-components";

export default function AnswerQuestionPage() {
    const [questionData, setQuestionData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const { questionId } = useParams();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUserInfo(user);
        })

        const FetchData = async () => {
            console.log(questionId);
            const questionRef = await ReadQuestion({ questionId: questionId });
            const data = questionRef.data();

            setQuestionData(data);
        }

        FetchData().catch(console.error);
    }, []);

    const handleLogin = async () => {
        await GoogleLogin();
    };

    const handleLogout = async () => {
        await Logout();

    };

    const H1 = styled.div`
        font-family: '210 Gulim';
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 157.52%;
        color: #C99FA9;
    `

    const H2 = styled.div`
        font-family: '210 OmniGothic';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 157.52%;
        color: #E5B8C3;
        display: inline;
    `
    return <>
        <H2>너의 대답이</H2><H1>궁그매</H1>
        {userInfo
            ? <Button onClick={handleLogout}>로그인아웃</Button>
            : <Button onClick={handleLogin}>로그인</Button>
        }
        <div>
            {userInfo != null
                ? userInfo.displayName
                : ""
            }
        </div>
        { }
        <AnswerQuestionForm user={userInfo} questionData={questionData} />
    </>
}

