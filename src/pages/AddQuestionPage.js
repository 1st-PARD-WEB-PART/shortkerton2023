
import NewQuestionForm from "../components/NewQuestionForm";
import { GetCurrentUser, GoogleLogin, IsLogin, Logout } from "../services/AuthService";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Button } from "@mui/material";

const AddQuestionPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUserInfo(user);
        })
    });
    const handleLogin = async () => {
        await GoogleLogin();
    };

    const handleLogout = async () => {
        await Logout();
    };
    return (
        <div>
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
            <NewQuestionForm user={userInfo}></NewQuestionForm>
        </div>
    );

}

export {AddQuestionPage};