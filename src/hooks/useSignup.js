import {useState, useEffect} from "react";
import {projectAuth} from "../firebase/config";
import {useAuthContext} from "./useAuthContext"; //returns context object containing our state and dispatch function

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {dispatch} = useAuthContext();

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        //signup user
        try{
            const response = await projectAuth.createUserWithEmailAndPassword(email, password);
            console.log(response.user);
            //catch network connection errors
            if(!response) {
                throw new Error("Could not complete signup");
            }

            //if new user is created successfully, add display name
            await response.user.updateProfile({displayName: displayName});
            
            //--------------------dispatch action -------------------- 
            //to update context value and login user locally
            dispatch({type: "LOGIN", payload: response.user});
     
            //----------- update state ------------
            if(!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        } 
        catch(err) {  //catch firebase errors
            console.log(err.message);
            //----------- update state ------------
            if(!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    //-------------- clean up function ---------------------
    useEffect(() => {
        // no effect
        return () => setIsCancelled(true);
    }, [])

    return {signup, error, isPending};
}