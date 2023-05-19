import { getAuth, signOut, signInWithPopup } from "firebase/auth"

const user = getAuth();


const GetCurrentUser = () => {
    return user.currentUser;
}

const Logout = async () => {
    if (GetCurrentUser() != null) {
        await signOut();
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

export { GetCurrentUser, Logout, GoogleLogin, IsLogin};