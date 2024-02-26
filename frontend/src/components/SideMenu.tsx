import { useState } from "react";
import styles from "./SideMenu.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";

interface SideMenuProps {
  isOpen: boolean;
}

const SideMenu = ({ isOpen }: SideMenuProps) => {
  const [showVisitMenu, setShowVisitMenu] = useState(false);
  const [showAboutMenu, setShowAboutMenu] = useState(false);

  return (
    <div className={`${styles.sideMenu} ${isOpen ? `${styles.open}` : ""}`}>
      <ul className={styles.customList}>
        <li>
          <Link href="/events" className="nostyle-link">
            EVENTS
          </Link>
        </li>
        <li>
          {" "}
          <Link href="/newsletter" className="nostyle-link">
            NEWSLETTER
          </Link>
        </li>
        <li>
          {" "}
          <Link href="/news" className="nostyle-link">
            NEWS
          </Link>
        </li>
        <li>
          {" "}
          <button
            className="noStyleButt"
            onClick={() => setShowAboutMenu((prev) => !prev)}
          >
            {showAboutMenu ? "-" : "+"} ABOUT
          </button>
          {showAboutMenu && (
            <ul className={styles.noStyleLi}>
              <li>BOARD MEMBERS</li>
              <li>CONTACT US</li>
            </ul>
          )}
        </li>
        <li>
          {" "}
          <Link href="/giftcards" className="nostyle-link">
            GIFT CARDS
          </Link>
        </li>
        <li>
          {" "}
          <Link href="/news" className="nostyle-link">
            BUSINESS DIRECTORY
          </Link>
        </li>
        <li>
          {" "}
          <button
            className="noStyleButt"
            onClick={() => setShowVisitMenu((prev) => !prev)}
          >
            {showVisitMenu ? "-" : "+"} VISIT
          </button>
          {showVisitMenu && (
            <ul className={styles.noStyleLi}>
              <li>LODGING</li>
              <li>PARKING</li>
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
