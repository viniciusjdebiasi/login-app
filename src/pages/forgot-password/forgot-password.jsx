import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import styles from "./forgot-password.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function Loading(value) {
    setIsLoading(value);
  }

  useEffect(() => {
    document.title = "Recupero password";
  }, []);

  async function SubmitNewPassword(e) {
    Loading(true);
    e.preventDefault();

    const payload = { emailUser: email };

    try {
      const response = await fetch("http://localhost:1110/userchangepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        navigate("/valid-code", { state: { userEmail: email } });
      } else if (!response.ok) {
        Loading(false);
        const errordata = await response.json();
        setMessage(errordata.message);
      }
    } catch (error) {
      Loading(false);
      setMessage("Errore durante l'invio del codice:", error.message);
    }
  }

  return (
    <main className={styles.backgroundFp}>
      <div className={styles.containFp}>
        <h1 className={styles.titleFp}>Recupero dell'account</h1>
        <h5 className={styles.formH3Fp}>
          Inserisci il tuo indirizzo email e ricevi il codice di accesso
          direttamente nella tua casella di posta.
        </h5>
        {message && <p className={styles.formFp}>{message}</p>}
        <form onSubmit={SubmitNewPassword}>
          <section className={styles.formSectionFp}>
            <p className={styles.formFp}>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInputFp}
              style={{ marginBottom: "1rem" }}
              placeholder="email@email.com"
              aria-label="Inserisci il tuo indirizzo email"
            />
          </section>
          <button type="submit" className={styles.buttonFp}>
            Invia <PaperPlaneIcon className={styles.iconFp} />
          </button>
        </form>
        <Link to={"/with-account"} className={styles.link}>
          Ho un account
        </Link>
        <Link to={"/new-codice"} className={styles.link}>
          Non ho ricevuto il mio codice
        </Link>
      </div>
      <div className={isLoading ? styles.loadingOnFp : styles.loadingOff}>
        <div className={styles.loadingMainFp}>
          <h4>Invio del codice per il recupero dell'account</h4>
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
