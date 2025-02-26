import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import {
  EnvelopeClosedIcon,
  TrashIcon,
  PlusIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import styles from "./card-user.module.css";

export default function CardUser() {
  let PORT = 1110;
  const tiltRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state;
  const idUser = userData.message[0].id;
  const [deleteUser, setDeleteUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function Loading(value) {
    setIsLoading(value);
  }

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 20,
        speed: 1000,
      });
    }
    return () => tiltRef.current?.vanillaTilt.destroy();
  }, []);

  useEffect(() => {
    document.title = `Area utente | ${userData.message[0].name}`;
  }, []);

  function handleDeleteUser(value) {
    setDeleteUser(value);
  }

  async function SubmitDeleteUser(id) {
    handleDeleteUser(false);
    Loading(true);
    try {
      const response = await fetch(`https://logintpage-react-api-production.up.railway.app/user/${id}`, {
        method: "DELETE",
      });
      if (response.status) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione dell'utente:", error);
    }
  }

  return (
    <main className={styles.backgroundCus}>
      <h1 className={styles.title}>Benvenuto!</h1>
      <div className={styles.cardContainCus} ref={tiltRef}>
        <div className={styles.emptyDiv}></div>
        <div className={styles.divProfileImage}>
          <img
            src={
              userData.message[0].image
                ? `http://localhost:1110/imagesuser/${userData.message[0].image}`
                : "http://localhost:1110/imagesuser/nouserimage.png"
            }
            alt={userData.message[0].name}
            className={styles.profileImage}
          />
        </div>
        <div className={styles.infoDiv}>
          <h2 className={styles.userName}> {userData.message[0].name}</h2>
          <section style={{ marginBottom: "1rem" }}>
            <p className={styles.infoUserCard}>
              <EnvelopeClosedIcon className={styles.cardIcon} />
              {userData.message[0].email}
            </p>
            <p className={styles.infoUserCard}>
              <PlusIcon className={styles.cardIcon} />
              {userData.message[0].phone}
            </p>
          </section>
          <button
            type="button"
            onClick={() => handleDeleteUser(true)}
            className={styles.buttonCus}
          >
            Eliminare <TrashIcon className={styles.cardIcon} />
          </button>
        </div>
      </div>

      <div className={deleteUser ? styles.deleteOn : styles.deleteOff}>
        <div className={styles.deleteMain}>
          <h2>Vuoi davvero eliminare il tuo account?</h2>
          <button
            type="button"
            onClick={() => handleDeleteUser(false)}
            className={styles.cancelButton}
          >
            <CrossCircledIcon className={styles.cancelIcon} />
          </button>
          <button
            type="button"
            onClick={() => SubmitDeleteUser(idUser)}
            className={styles.buttonCus}
          >
            Eliminare <TrashIcon className={styles.iconCus} />
          </button>
        </div>
      </div>
      <div className={isLoading ? styles.loadingOnCus : styles.loadingOff}>
        <div className={styles.loadingMainCus}>
          <h4>Eliminazione del tuo account</h4>
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
