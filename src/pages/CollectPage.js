import styled from "styled-components";
import QuestionList from "../components/QuestionList";

function Collectpage() {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUserInfo(user);
        })
    });
    const handleLogin = async () => {
        await GoogleLogin();
    };
 tr
    const handleLogout = async () => {
        await Logout();
    };

    return (
        <div>
            <QuestionList />
        </div>
    );
};

export default Collectpage;