import TextField from "../components/TextField";
import styled from 'styled-components';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../src/firebase";
import { useEffect, useState } from "react";

const H1 = styled.div`
    color : #FFFFFF;
`
const LoginButton = styled.button`
color: white
`;


function HomePage() {
    const [userData, setUserData] = useState(null);
    function handleGoogleLogin() {
        const provider = new GoogleAuthProvider(); // provider 구글 설정
        signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
          .then((data) => {
            setUserData(data.user); // user data 설정
            console.log(data); // console에 UserCredentialImpl 출력
          })
          .catch((err) => {
            console.log(err);
          });
      }


    return (
    <div>
        <LoginButton onClick={handleGoogleLogin}>로그인</LoginButton>
        {userData
          ? userData.displayName : ""}
        <div>
            <H1>질문을 입력하시오</H1>
            <TextField />
            <H1>답변을 입력하시오</H1>
            <TextField />
        </div>
    </div>
    );
}

export default HomePage;

