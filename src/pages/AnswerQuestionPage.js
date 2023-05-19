import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReadQuestion } from "../services/DbService";
import AnswerQuestionForm from "../components/AnswerQuestionForm";
import { GoogleLogin, Logout } from "../services/AuthService";
import { auth } from '../firebase';
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

    const PartDiv = styled.div`
        display: flex;
        flex-direction: column;
        height: 850px;
        align-items: center;
        justify-content: center;
        `;

    const H1 = styled.div`
        font-family: '210 Gulim';
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 157.52%;
        color: #C99FA9;
        text-align: center;
    `
    const H2 = styled.div`
        font-family: '210 OmniGothic';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 157.52%;
        color: #E5B8C3;
        text-align: center;
    `

    const Wrap = styled.div`
        width: 444px;
        height: 603px;
        background-color: #FACCDA;
        justify-content: center;
        border-radius: 40px;
        margin-bottom: 50px;
    `

    const Text = styled.div`
        /* margin-left: 800px; */
        margin-top: 50px;
    `
    return <>
        {/* {userInfo
            ? <Button onClick={handleLogout}>로그인아웃</Button>
            : <Button onClick={handleLogin}>로그인</Button>
        }
        <div>
            {userInfo != null
                ? userInfo.displayName
                : ""
            }
        </div> */}
        { }
        <PartDiv>
            <Text>
                <H2>너의 대답이</H2><H1> 궁그매</H1><br></br>
            </Text>
            {/* <Wrap> */}
                <AnswerQuestionForm user={userInfo} questionData={questionData} />
            {/* </Wrap> */}
        </PartDiv>
    </>
}


//e7be59ad-01ac-462a-83fc-75cf0bc4bbe2

