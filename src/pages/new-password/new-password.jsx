import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  PaperPlaneIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import styles from "./new-password.module.css";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifiedStatus, setVerifiedStatus] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [messageConfirmPassword, setMessageConfirmPassword] = useState("");
  const location = useLocation();
  const { userEmail } = location.state;

  function Loading(value) {
    setIsLoading(value);
  }

  function handleShowPasswordUser(event) {
    event.preventDefault();
    setShowPassword(!showPassword);
  }

  function handleShowConfirmPasswordUser(event) {
    event.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  }

  useEffect(() => {
    document.title = "Nuova password";
  }, []);

  function handleConfirmPassword(e) {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value === password) {
      setMessageConfirmPassword("");
      setVerifiedStatus(true);
    } else {
      setMessageConfirmPassword("Le password devono essere le stesse");
      setVerifiedStatus(false);
    }
  }

  async function SubmitNewPassword(e) {
    e.preventDefault();
    if (verifiedStatus === true) {
      Loading(true);

      const payload = { emailUser: userEmail, newpassword: password };

      try {
        const response = await fetch("http://localhost:1110/newpassword", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
          navigate("/with-account");
        } else if (!response.ok) {
          Loading(false);
          const errordata = await response.json();
          setMessage(errordata.message);
        }
      } catch (error) {
        Loading(false);
        setMessage("Errore durante l'invio del codice:", error.message);
      }
    } else if (verifiedStatus === false) {
      setMessageConfirmPassword("Le password devono essere le stesse");
    } else {
      setMessageConfirmPassword("Conferma la tua password");
    }
  }

  return (
    <main className={styles.backgroundNp}>
      <div className={styles.containNp}>
        <h1 className={styles.title}>New Password</h1>
        <h5 className={styles.formH3Np}>Inserisci la tua nuova password</h5>
        {message && <p className={styles.formPNp}>{message}</p>}
        <form onSubmit={SubmitNewPassword}>
          <section className={styles.formSectionNp}>
            <p className={styles.formPNp}>Nuova password</p>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInputNp}
            />
            <button
              onClick={handleShowPasswordUser}
              className={styles.passwordButtonNp}
            >
              {showPassword ? (
                <EyeClosedIcon className={styles.passwordIconNp} />
              ) : (
                <EyeOpenIcon className={styles.passwordIconNp} />
              )}
            </button>
          </section>
          <section className={styles.formSectionNp}>
            <p className={styles.formPNp}>Confermare password</p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={styles.formInputNp}
              style={{ marginBottom: "0.7rem" }}
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />

            <button
              onClick={handleShowConfirmPasswordUser}
              className={styles.confirmPasswordButtonNp}
            >
              {showConfirmPassword ? (
                <EyeClosedIcon className={styles.passwordIconNp} />
              ) : (
                <EyeOpenIcon className={styles.passwordIconNp} />
              )}
            </button>
            {messageConfirmPassword && (
              <p className={styles.formPNp}>{messageConfirmPassword}</p>
            )}
          </section>
          <button type="submit" className={styles.buttonNp}>
            Invia <PaperPlaneIcon className={styles.iconNp} />
          </button>
        </form>
      </div>
      <div className={isLoading ? styles.loadingOnNp : styles.loadingOff}>
        <div className={styles.loadingMainNp}>
          <h4>Modificare la password</h4>
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
