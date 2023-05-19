import { getAuth, signOut } from "firebase/auth"

const user = getAuth();

const GetCurrentUser = () => {
    
    return user.currentUser;
}

const Logout = async () => {
    if(GetCurrentUser() != null){
        await signOut();
    }
}

export {GetCurrentUser};