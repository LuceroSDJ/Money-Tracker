import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useCollection} from "../../hooks/useCollection";

export default function Home() {
    const {user} = useAuthContext();
    const {documents, error} = useCollection(
        "transaction",
        ["uid", "==", user.uid],  //to make this array into one argument in useCollection, we can just spread this array inside the where() method
        ["createdAt", "desc"]
        );
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {error && <p>{error}</p>}
                {documents && <TransactionList transactions={documents} />}
            </div>
            <div className={styles.sidebar}>
                <TransactionForm uid={user.uid} />
            </div>
        </div>
    )
}
