import {useState} from "react";
import {useLogin} from "../../hooks/useLogin";
import styles from "./Login.module.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, error, isPending} = useLogin();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("login:", email, password);
        login(email, password);
        // setIsPending(false) - works but does not show the loading button
        
    }
    // console.log("isPending after login: ", isPending)

    return (
        // <form className={styles.login-form}>  does not work. Use [] instead
        <form onSubmit={handleSubmit} className={styles["login-form"]}>
            <h2>Login</h2>
            <label>
                <span>email:</span>
                <input 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>

            <label>
                <span>password:</span>
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>

            <button className="btn" disabled={isPending}>{isPending ? "Loading" : "Login"}</button>
            {/* {!isPending && <button className="btn">Login</button>}
            {isPending && <button className="btn" disabled>Loading</button>} */}
            {error && <p>{error}</p>}
        </form>
    )
}
