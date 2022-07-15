import {useState, useEffect} from "react";
import {projectAuth} from "../firebase/config"; //we need this to interact with auth firebase service
import {useAuthContext} from "./useAuthContext"; //we need access to our context object

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {dispatch} = useAuthContext();

    //we need a function that we can return inside useLogout function:
    const logout = async () => {
        setError(null);
        setIsPending(true);

        //------------------- signout user ---------------------
        try {
            await projectAuth.signOut(); //don't we need to provide a user's id?????????

            //--------------- dispatch logout action ------------
            dispatch({type: "LOGOUT"});

            //--------------- update state ----------------------
            if(!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        } 
        catch(err) {
            console.log(err.message);
            //--------------- update state ---------------------
            if(!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }  
        }
    }

    //-------------------- clean up function ---------------------
    useEffect(() => {
        // no effect
        return () => setIsCancelled(true);
    }, [])

    return {logout, error, isPending}

}
