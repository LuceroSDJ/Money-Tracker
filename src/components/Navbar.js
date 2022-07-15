import {useState} from "react";
import {Link} from "react-router-dom";
import {useLogout} from "../hooks/useLogout";
import {useAuthContext} from "../hooks/useAuthContext";  //returns context object
//styles
import styles from "./Navbar.module.css";


export default function Navbar() {
    const {logout} = useLogout();
    const {user} = useAuthContext();
    const [activate, setActivate] = useState(styles["nav-menu"]);
    const [toggleIcon, setToggleIcon] = useState(styles["nav-toggler"]);

    const navToggle = () => {
        activate === styles["nav-menu"] 
        // ? setActivate(styles["nav-menu"] + " " + styles["nav-active"])
        ? setActivate(`${styles["nav-menu"]} ${styles["nav-active"]}`)
        : setActivate(styles["nav-menu"]);

        //toggler icon
        toggleIcon === styles["nav-toggler"]
        ? setToggleIcon(`${styles["nav-toggler"]} ${styles["toggle"]}`)
        : setToggleIcon(styles["nav-toggler"]);
    }

    return (
        <nav className={styles.navbar} >
          <p className={styles.title}>myMoneyLog</p>
          <ul className={activate}>

            {!user && (
                <>
                    <li className={styles["nav-item"]}><Link to="/signup">Signup</Link></li>
                    <li className={styles["nav-item"]}><Link to="/login">Login</Link></li>
                </>
            )}
            
            {user && (
                <>
                    <li className={styles["nav-item"]}>Hello, {user.displayName} </li>
                    <li className={styles["nav-item"]}>
                        <button className="btn" onClick={logout}>Logout</button>
                    </li>
                </>
            )}
          </ul>
          <div onClick={navToggle} className={toggleIcon}>
              <div className={styles.line1}></div>
              <div className={styles.line2}></div>
              <div className={styles.line3}></div>
          </div>
        </nav>
    )
}
