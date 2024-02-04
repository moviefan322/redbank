import React from "react";
import styles from "./Greetings.module.css";

const Greetings = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center pt-4">
      <h2 className={`${styles.textHead} font-weight-light text-center`}>Greetings From Asbury Park!</h2>
      <p className={`${styles.textBody} text-center`}>
        Asbury Park Downtown is a lively and eclectic neighborhood, boasting a
        wide array of businesses that cater to an array of tastes and interests.
        Food enthusiasts will delight in the varied international flavors served
        up in our local eateries. Our retail stores offer more than just
        shopping; they provide personalized experiences and opportunities to
        learn new skills, from music lessons to crafting workshops. Dive into
        the arts at our local galleries, catch the latest films at our movie
        theater, or join in the fun at our numerous community events. We invite
        you to shop, dine, and immerse yourself in the unique culture of Asbury
        Park Downtown.
      </p>
    </div>
  );
};

export default Greetings;
