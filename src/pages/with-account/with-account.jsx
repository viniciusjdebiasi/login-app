import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ResetIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import styles from "./with-account.module.css";

export default function WithAccount() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let PORT = 1110;

  function Loading(value) {
    setIsLoading(value);
  }

  function handleShowPasswordUser(event) {
    event.preventDefault();
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    document.title = "Accesso utente";
  }, []);

  async function SubmitUserAccount(e) {
    Loading(true);
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:${PORT}/user/?emailUser=${encodeURIComponent(
          email
        )}&passwordUser=${encodeURIComponent(password)}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        setMessage("");
        const data = await response.json();
        setEmail("");
        setPassword("");
        navigate("/card-user", { state: { userData: data } });
      } else {
        Loading(false);
        const data = await response.json();
        console.error("Errore di richiesta:", response.status);
        setMessage(data.message);
      }
    } catch (error) {
      Loading(false);
      console.error("Errore durante il recupero dei dati:", error);
      setMessage(`Impossibile cercare l'utente`);
    }
  }

  return (
    <main className={styles.backgroundWa}>
      <div className={styles.containWa}>
        <h1 className={styles.title}>Accedi il tuo account</h1>
        {message && <p className={styles.formPWa}>{message}</p>}
        <form onSubmit={SubmitUserAccount}>
          <section className={styles.formSectionWa}>
            <p className={styles.formPWa}>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInputWa}
              placeholder="email@email.com"
            />
            <p className={styles.formPWa}>Password</p>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInputWa}
              style={{ marginBottom: "1rem" }}
              placeholder="La tua password"
            />
            <button
              onClick={handleShowPasswordUser}
              className={styles.passwordButtonWa}
            >
              {showPassword ? (
                <EyeClosedIcon className={styles.passwordIconWa} />
              ) : (
                <EyeOpenIcon className={styles.passwordIconWa} />
              )}
            </button>
          </section>
          <button type="submit" className={styles.buttonWa}>
            Login <PaperPlaneIcon className={styles.iconWa} />
          </button>
        </form>
        <Link to={"/forgot-password"} className={styles.link}>
          Password dimenticata?
        </Link>
        <Link to={"/"}>
          <ResetIcon className={styles.resetIconWa} />
        </Link>
      </div>
      <div className={isLoading ? styles.loadingOnWa : styles.loadingOff}>
        <div className={styles.loadingMainWa}>
          <h4>Accesso al tuo account</h4>
          <div
            className="spinner-border"
            style={{ width: " 3rem", height: "3rem" }}
            role="status"
          ></div>
        </div>
      </div>
    </main>
  );
}
