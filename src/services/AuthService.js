import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
import { app } from "../firebase";

const auth = getAuth(app);

const GetCurrentUser = () => {
    return auth.currentUser;
}

const Logout = async () => {
    if (auth.currentUser != null) {
        await signOut(auth);
    } else {
        console.log("user not found");
    }
}

const LoginWithProvider = async ({ provider }) => {
    await signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
        .then((data) => { // user data 설정
            console.log(data); // console에 UserCredentialImpl 출력
        })
        .catch((err) => {
            console.log(err);
        });
}

const GoogleLogin = async () => {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    await LoginWithProvider({ provider });
}

const IsLogin = () => {
    return GetCurrentUser() != null;
}

export { GetCurrentUser, Logout, GoogleLogin, IsLogin };