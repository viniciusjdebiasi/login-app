import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import styles from "./valid-code.module.css";

export default function ValidCode() {
  const [cod1, setCod1] = useState("");
  const [cod2, setCod2] = useState("");
  const [cod3, setCod3] = useState("");
  const [cod4, setCod4] = useState("");
  const [cod5, setCod5] = useState("");
  const [cod6, setCod6] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cod = `${cod1}${cod2}${cod3}${cod4}${cod5}${cod6}`;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { userEmail } = location.state;

  function Loading(value) {
    setIsLoading(value);
  }

  function handleChangeCods(value, setValue, nextInput) {
    if(value.length > 1) return;
    setValue(value);

    if (value.length === 1 && nextInput) {
      nextInput.focus(); 
    }
  }

  useEffect(() => {
    document.title = "Validazione del codice";
  }, []);

  async function SubmitFormCreateAccount(e) {
    Loading(true);
    e.preventDefault();

    const payload = { emailUser: userEmail, codeUser: cod };

    try {
      const response = await fetch("http://localhost:1110/verifycode", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        navigate("/new-password", { state: { userEmail: userEmail } });
      } else if (!response.ok) {
        Loading(false);
        const errordata = await response.json();
        setMessage(errordata.message, user);
      }
    } catch (error) {
      Loading(false);
      setMessage("Errore durante l'invio del codice:", error.message);
    }
  }

  return (
    <main className={styles.backgroundVc}>
      <div className={styles.containVc} style={{ maxWidth: "30rem" }}>
        <h1 className={styles.title}>Validazione del codice</h1>
        <h5 className={styles.formH3Vc}>
          Codice inviato con successo! Controlla la tua posta elettronica.
        </h5>
        {message && <p className={styles.formPVc}>{message}</p>}
        <form onSubmit={SubmitFormCreateAccount} className={styles.formVc}>
          <section className={styles.formSectionValidVc}>
            <p className={styles.formPVc}>Codice</p>
            <section className={styles.formCodInputSectionVc}>
              <input
                type="text"
                value={cod1}
                onChange={(e) => handleChangeCods(e.target.value, setCod1, document.getElementById("cod2"))}
                className={styles.formCodInputVc}
                maxLength={1}
              />
              <input
                type="text"
                value={cod2}
                onChange={(e) => handleChangeCods(e.target.value, setCod2, document.getElementById("cod3"))}
                className={styles.formCodInputVc}
                maxLength={1}
                id="cod2"
              />
              <input
                type="text"
                value={cod3}
                onChange={(e) => handleChangeCods(e.target.value, setCod3, document.getElementById("cod4"))}
                className={styles.formCodInputVc}
                maxLength={1}
                id="cod3"
              />
              <input
                type="text"
                value={cod4}
                onChange={(e) => handleChangeCods(e.target.value, setCod4, document.getElementById("cod5"))}
                className={styles.formCodInputVc}
                maxLength={1}
                id="cod4"
              />
              <input
                type="text"
                value={cod5}
                onChange={(e) => handleChangeCods(e.target.value, setCod5, document.getElementById("cod6"))}
                className={styles.formCodInputVc}
                maxLength={1}
                id="cod5"
              />
            </section>
            <input
              type="text"
              value={cod6}
              onChange={(e) => handleChangeCods(e.target.value, setCod6, null)}
              className={styles.formCodInputVc}
              maxLength={1}
              id="cod6"
            />
          </section>
          <button type="submit" className={styles.buttonVc}>
            Invia <PaperPlaneIcon className={styles.iconVc} />
          </button>
          <Link to={"/new-codice"} className={styles.link}>
            Non ho ricevuto il mio codice
          </Link>
        </form>
      </div>
      <div className={isLoading ? styles.loadingOnVc : styles.loadingOff}>
        <div className={styles.loadingMainVc}>
          <h4>Convalida del tuo codice</h4>
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
