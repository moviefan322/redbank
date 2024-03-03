import React, { useState, useEffect } from "react";
import styles from "./boardMembers.module.css";

const BoardMembers = () => {
  const [boardMembers, setBoardMembers] = useState<any[]>([]);
  const [officers, setOfficers] = useState<any[]>([]);
  const [directors, setDirectors] = useState<any[]>([]);

  const fetchBoardMembers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/boardMembers`
      );
      const data = await res.json();
      setBoardMembers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBoardMembers();
  }, []);

  useEffect(() => {
    const officers = boardMembers.filter(
      (boardMember) => boardMember.officerOrDirector === "Officer"
    );
    const directors = boardMembers.filter(
      (boardMember) => boardMember.officerOrDirector === "Director"
    );
    setOfficers(officers);
    setDirectors(directors);
  }, [boardMembers]);

  return (
    <div className="py-5 w-75 mx-auto">
      <div className="mx-auto">
        <h1 className="text-center my-5">Board of Directors</h1>
        <p>
          Red Bank River Center is governed by a board of trustees who oversee
          our small but versatile staff. The board of trustees comprises
          business and property owners in the self-improvement district, members
          from other Red Bank community partners, and a few Red Bank residents
          appointed by the mayor.
        </p>
      </div>
      <div className="mt-5">
        <h2>Officers</h2>
        <div className="d-flex flex-wrap">
          {officers.map((officer, index) => {
            return (
              <div key={index} className={`${styles.nameBox} col-3`}>
                <p className={styles.name}>{officer.name}</p>
                <small>
                  {officer.position} {officer.department}{" "}
                </small>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-5">
        <h2>Directors</h2>
        <div className="d-flex flex-wrap">
          {directors.map((director, index) => {
            return (
              <div key={index} className={`${styles.nameBox} col-3`}>
                <p className={styles.name}>{director.name}</p>
                <small>
                  {director.position}
                  {director.position && director.department && ";"}{" "}
                  {director.department}{" "}
                </small>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BoardMembers;
