import React from "react";
import { MoonLoader } from "react-spinners";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.spinnerContainer}>
        <MoonLoader
          color="red"
          size={75}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <small className={styles.spinnerText}>Loading...</small>
      </div>
    </div>
  );
};

export default Spinner;
