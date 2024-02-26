import { useState } from "react";
import Hamburger from "hamburger-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from "./MobileNavBar.module.css";

interface NavBarProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const MobileNavBar = ({ toggleMenu, isMenuOpen }: NavBarProps) => {
  return (
    <nav className={styles.navbar}>
      <div className="noStyleButt">
        {" "}
        <FaMagnifyingGlass className="m-3" />
      </div>

      <div className={styles.image1}></div>
      <div className="noStyleButt">
        <Hamburger toggled={isMenuOpen} toggle={toggleMenu} />
      </div>
    </nav>
  );
};

export default MobileNavBar;
