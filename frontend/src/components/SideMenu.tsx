import { useState } from "react";
import styles from "./SideMenu.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";

interface SideMenuProps {
  isOpen: boolean;
  setMenuOpen: (arg: boolean) => void;
}

const SideMenu = ({ isOpen, setMenuOpen }: SideMenuProps) => {
  const [showVisitMenu, setShowVisitMenu] = useState(false);
  const [showAboutMenu, setShowAboutMenu] = useState(false);

  return (
    <div className={`${styles.sideMenu} ${isOpen ? `${styles.open}` : ""}`}>
      <ul className={styles.customList}>
        <li>
          <Link href="/events" className="nostyle-link">
            <button className="noStyleButt" onClick={() => setMenuOpen(false)}>
              EVENTS
            </button>
          </Link>
        </li>
        <li>
          {" "}
          <Link href="/newsletter" className="nostyle-link">
            <button className="noStyleButt" onClick={() => setMenuOpen(false)}>
              NEWSLETTER
            </button>
          </Link>
        </li>
        <li>
          {" "}
          <Link href="/news" className="nostyle-link">
            <button className="noStyleButt" onClick={() => setMenuOpen(false)}>
              NEWS
            </button>
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
              <Link href="/about/boardMembers" className="nostyle-link">
                <button
                  className="noStyleButt"
                  onClick={() => setMenuOpen(false)}
                >
                  <li>BOARD MEMBERS</li>
                </button>
              </Link>
              <Link href="/about/contact" className="nostyle-link">
                <button
                  className="noStyleButt"
                  onClick={() => setMenuOpen(false)}
                >
                  <li>CONTACT US</li>
                </button>
              </Link>
            </ul>
          )}
        </li>
        <li>
          {" "}
          <Link href="/giftCard" className="nostyle-link">
            <button className="noStyleButt" onClick={() => setMenuOpen(false)}>
              GIFT CARDS
            </button>
          </Link>
        </li>
        <li>
          {" "}
          <Link href="/businessDirectory" className="nostyle-link">
            <button className="noStyleButt" onClick={() => setMenuOpen(false)}>
              BUSINESS DIRECTORY
            </button>
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
              <Link href="/lodging" className="nostyle-link">
                <button
                  className="noStyleButt"
                  onClick={() => setMenuOpen(false)}
                >
                  <li>LODGING</li>
                </button>
              </Link>
              <Link href="/parking" className="nostyle-link">
                <button
                  className="noStyleButt"
                  onClick={() => setMenuOpen(false)}
                >
                  <li>PARKING</li>
                </button>
              </Link>
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
