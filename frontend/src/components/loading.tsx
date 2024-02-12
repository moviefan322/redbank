import React from "react";
import { FadeLoader } from "react-spinners";
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loading}>
        <FadeLoader color={"#08FF00"} />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
