import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PaperPlaneIcon,
  CameraIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import styles from "./create-account.module.css";

export default function CreateAccount() {
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifiedStatus, setVerifiedStatus] = useState("");
  const [message, setMessage] = useState("");
  const [messageConfirmPassword, setMessageConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    document.title = "Creare un account";
  }, []);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  }

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

  async function SubmitNewUser(e) {
    e.preventDefault();
    if (verifiedStatus === true) {
      Loading(true);

      const formData = new FormData();
      formData.append("nameUser", name);
      formData.append("dayDateUser", day);
      formData.append("monthDateUser", month);
      formData.append("yearDateUser", year);
      formData.append("emailUser", email);
      formData.append("phoneUser", phone);
      formData.append("passwordUser", password);
      formData.append("image", image);

      try {
        const response = await fetch("http://localhost:1110/user", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          Loading(false);
          const data = await response.json();
          setMessage(data.message);
          navigate("/card-user", { state: { userData: data } });
        } else if (!response.ok) {
          Loading(false);
          const errordata = await response.json();
          setMessage(errordata.message);
        }
      } catch (error) {
        Loading(false);
        setMessage(
          "Errore durante la registrazione dell'utente:",
          error.message
        );
      }
    } else if (verifiedStatus === false) {
      setMessage("Le password devono essere le stesse");
      setMessageConfirmPassword("");
    } else {
      setMessage("Conferma la tua password");
    }
  }

  return (
    <main className={styles.backgroundCa}>
      <div id="topo"></div>
      <div className={styles.containCa}>
        <h1 className={styles.title}>Create Account</h1>
        {message && <p className={styles.formPCa}>{message}</p>}
        <form onSubmit={SubmitNewUser}>
          <section className={styles.formSectionCa}>
            <p className={styles.formPCa}>Nome e cognome</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.formInput}
              placeholder="Giuseppe De Biasi"
            />
          </section>
          <section className={styles.formSectionBorn}>
            <section>
              <p className={styles.formPCa}>Giorno</p>
              <input
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className={`${styles.formInput} ${styles.inputBorn}`}
                maxLength={2}
              />
            </section>
            <section>
              <p className={styles.formPCa}>Mese</p>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={`${styles.formInput} ${styles.inputBorn}`}
                maxLength={2}
              />
            </section>
            <section>
              <p className={styles.formPCa}>Anno</p>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={`${styles.formInput} ${styles.inputBorn}`}
                maxLength={4}
              />
            </section>
          </section>
          <section className={styles.formSectionCa}>
            <p className={styles.formPCa}>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
              placeholder="email@email.com"
            />
          </section>
          <section className={styles.formSectionCa}>
            <p className={styles.formPCa}>Telefono</p>
            <input
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.formInput}
              placeholder="12345678910"
            />
          </section>
          <section className={styles.formSectionCa}>
            <p className={styles.formPCa}>Password</p>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              placeholder="La tua password"
            />
            <button
              onClick={handleShowPasswordUser}
              className={styles.passwordButton}
            >
              {showPassword ? (
                <EyeClosedIcon className={styles.passwordIcon} />
              ) : (
                <EyeOpenIcon className={styles.passwordIcon} />
              )}
            </button>
          </section>
          <section className={styles.formSectionCa}>
            <p className={styles.formPCa}>Confermare password</p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={styles.formInput}
              placeholder="Conferma il tuo password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
            <button
              onClick={handleShowConfirmPasswordUser}
              className={styles.confirmPasswordButton}
            >
              {showConfirmPassword ? (
                <EyeClosedIcon className={styles.passwordIcon} />
              ) : (
                <EyeOpenIcon className={styles.passwordIcon} />
              )}
            </button>
            {messageConfirmPassword && (
              <p className={styles.formPCa}>{messageConfirmPassword}</p>
            )}
          </section>
          <section className={styles.sectionImagemCa}>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              id="file-input"
              accept="image/*"
            />
            <div className={styles.divShowImage}>
              <label htmlFor="file-input" className={styles.fileInput}>
                <div className={styles.hoverImage}>
                  <CameraIcon className={styles.cameraIconCa} />
                </div>
                <img
                  src={
                    previewImage
                      ? `${previewImage}`
                      : "http://localhost:1110/imagesuser/nouserimage.png"
                  }
                  className={styles.showImage}
                />
              </label>
            </div>
          </section>
          <button
            type="submit"
            className={styles.buttonCa}
            onClick={() =>
              document
                .getElementById("topo")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Invia <PaperPlaneIcon className={styles.iconCa} />
          </button>
        </form>
        <Link to={"/with-account"} className={styles.link}>
          Ho un account
        </Link>
        <div className={isLoading ? styles.loadingOnCa : styles.loadingOff}>
          <div className={styles.loadingMainCa}>
            <h4>Creazione utente</h4>
            <div
              className="spinner-border"
              style={{ width: " 3rem", height: "3rem" }}
              role="status"
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}
