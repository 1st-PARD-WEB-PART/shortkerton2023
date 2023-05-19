import QuestionList from "../components/QuestionList";
import NewQuestionForm from "../components/NewQuestionForm";
import { GetCurrentUser, GoogleLogin, IsLogin, Logout } from "../services/AuthService";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Button } from "@mui/material";

function CollectPage() {
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
            <QuestionList />
        </div>
    );
};

export default CollectPage;