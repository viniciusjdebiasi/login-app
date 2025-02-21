import { Link } from "react-router-dom";
import { PinRightIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import styles from "./home.module.css";

export default function Home() {
  useEffect(() => {
    document.title = 'Home';
  }, [])
  return (
    <main className={styles.backgroundHome}>
      <div className={styles.containHome}>
        <Link to={"/with-account"} className={styles.buttonHome}>
          Ho un account <PinRightIcon className={styles.iconHome} />
        </Link>
        <Link to={"/create-account"} className={styles.buttonHome}>
          Creare un account <PinRightIcon className={styles.iconHome} />
        </Link>
      </div>
    </main>
  );
}
