import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReadQuestion } from "../services/DbService";
import AnswerQuestionForm from "../components/AnswerQuestionForm";
import { GoogleLogin, Logout } from "../services/AuthService";
import { auth } from '../firebase';
import { Button } from "@mui/material";


export default function AnswerQuestionPage() {
    const [questionData, setQuestionData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const { questionId } = useParams();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUserInfo(user);
        })

        const FetchData = async () => {
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
    return <>
    {console.log("question data: " + questionData)}
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

