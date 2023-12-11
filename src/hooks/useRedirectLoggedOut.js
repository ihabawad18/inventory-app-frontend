import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { SET_LOGIN } from "../redux/features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getLoginStatus } from "../services/authService"
import { toast } from "react-toastify"
const useRedirectLoggedOut = (path) =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(
        ()=>{
            const redirectLoggedOutUser = async ()=>{
                const isLoggedIn = await getLoginStatus();
                dispatch(SET_LOGIN(isLoggedIn));

                if(!isLoggedIn){
                    toast.info("Session has expired, please log in to continue");
                    navigate(path);
                    return ;
                }
            
            };
            redirectLoggedOutUser();
        }
    ,[dispatch,navigate,path])
}

export default useRedirectLoggedOut;