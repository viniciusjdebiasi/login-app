import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import styles from "./new-codice.module.css";

export default function NewCodice() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function Loading(value) {
    setIsLoading(value);
  }

  useEffect(() => {
    document.title = "Nuovo codice";
  }, []);

  async function SubmitCode(e) {
    Loading(true);
    e.preventDefault();

    const payload = { emailUser: email };

    try {
      const response = await fetch(
        "http://localhost:1110/userchangepassword-newcodice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

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
    <main className={styles.backgroundNc}>
      <div className={styles.containNc}>
        <h1 className={styles.title}>Recupero dell'account</h1>
        <h5 className={styles.formH3Nc}>
          Inserisci il tuo indirizzo email e ricevi un nuovo codice di accesso
          direttamente nella tua casella di posta.
        </h5>
        {message && <p className={styles.formPNc}>{message}</p>}
        <form onSubmit={SubmitCode}>
          <section className={styles.formSectionNc}>
            <label htmlFor="email" className={styles.formPNc}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInputNc}
              placeholder="email@email.com"
              required
            />
          </section>
          <button type="submit" className={styles.buttonNc}>
            Invia <PaperPlaneIcon className={styles.iconNc} />
          </button>
        </form>
        <Link to="/with-account" className={styles.link}>
          Ho un account
        </Link>
      </div>
      <div className={isLoading ? styles.loadingOnNc : styles.loadingOff}>
        <div className={styles.loadingMainNc}>
          <h4>Invio di un nuovo codice</h4>
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
