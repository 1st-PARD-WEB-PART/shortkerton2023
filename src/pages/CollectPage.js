import QuestionList from "../components/QuestionList";
import NewQuestionForm from "../components/NewQuestionForm";
import { GetCurrentUser, GoogleLogin, IsLogin, Logout } from "../services/AuthService";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Button } from "@mui/material";
import { ReadAllAnswerOfOwnQuestion, ReadAllAnswerOfQuestion, ReadAllMyQuestion } from "../services/DbService";

function CollectPage() {
    const [foundedQuestion, setFoundedQuestion] = useState([]);
    const [userInfo, setUserInfo] = useState(GetCurrentUser());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo != null) {
                    const foundedQuestion = await ReadAllMyQuestion({ userId: userInfo.uid });
                    setFoundedQuestion(foundedQuestion);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userInfo]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUserInfo(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (loading || userInfo == null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <QuestionList questionList={foundedQuestion} userId={userInfo.uid} />
        </div>
    );
};

export default CollectPage;