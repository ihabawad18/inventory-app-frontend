import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

export const ShowOnLogIn = ({children})=>{
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(isLoggedIn){
        return <>{children}</>
    }
    
    return null;
    
}

export const ShowOnLogOut = ({children})=>{
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(!isLoggedIn){
        return <>{children}</>
    }
    
    return null;
    
}