import { useState } from "react";
import styles from "./SideMenu.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";

interface SideMenuProps {
  isOpen: boolean;
}

const SideMenu = ({ isOpen }: SideMenuProps) => {
  const [showVisitMenu, setShowVisitMenu] = useState(false);
  const [showEventsMenu, setShowEventsMenu] = useState(false);
  const [showAboutMenu, setShowAboutMenu] = useState(false);
  const [showBusinessMenu, setShowBusinessMenu] = useState(false);

  return (
    <div className={`${styles.sideMenu} ${isOpen ? `${styles.open}` : ""}`}>
      <ul className={styles.customList}>
        <li>
          <button
            className="noStyleButt"
            onClick={() => setShowVisitMenu((prev) => !prev)}
          >
            {showVisitMenu ? "-" : "+"} VISIT
          </button>
        </li>
        {showVisitMenu && (
          <ul className={styles.noStyleLi}>
            <li>DOWNTOWN BUSINESSES</li>
            <li>
              <Link
                className={styles.noStyleLink}
                href="https://www.asbury.edu/admissions-aid/"
              >
                ASBURY UNIVERSITY
              </Link>
            </li>
            <li>
              <Link
                className={styles.noStyleLink}
                href="https://www.stoneponyonline.com/"
              >
                THE STONE PONY
              </Link>
            </li>
            <li>PARKING</li>
            <li>PHOTO TOUR</li>
          </ul>
        )}

        <li>
          {" "}
          <button
            className="noStyleButt"
            onClick={() => setShowEventsMenu((prev) => !prev)}
          >
            {showEventsMenu ? "-" : "+"} EVENTS
          </button>
          {showEventsMenu && (
            <ul className={styles.noStyleLi}>
              <li>UPCOMING EVENTS</li>
              <li>RECURRING EVENTS</li>
              <li>FARMERS MARKET</li>
            </ul>
          )}
        </li>
        <li>
          {" "}
          <button
            className="noStyleButt"
            onClick={() => setShowAboutMenu((prev) => !prev)}
          >
            {showAboutMenu ? "-" : "+"} ABOUT US
          </button>
          {showAboutMenu && (
            <ul className={styles.noStyleLi}>
              <li>MISSION & STAFF</li>
              <li>VOLUNTEER</li>
              <li>CONTACT US</li>
            </ul>
          )}
        </li>
        <li>
          {" "}
          <button
            className="noStyleButt"
            onClick={() => setShowBusinessMenu((prev) => !prev)}
          >
            {showBusinessMenu ? "-" : "+"} BUSINESS RESOURCES
          </button>
          {showBusinessMenu && (
            <ul className={styles.noStyleLi}>
              <li>AVAILABLE PROPERTIES</li>
              <li>BUSINESS SUPPORT</li>
              <li>LOCAL EMPLOYMENT</li>
              <li>RESOURCES & LINKS</li>
            </ul>
          )}
        </li>
        <FaMagnifyingGlass className={styles.searchIcon} />
        <br />
        <button className={`noStyleButt ${styles.donateButt}`}>DONATE</button>
      </ul>
    </div>
  );
};

export default SideMenu;
