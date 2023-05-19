import TextField from "../components/TextField";

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
            
        </div>
    );

}

export default HomePage;

