import { useState } from "react";
import Hamburger from "hamburger-react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import styles from "./MobileNavBar.module.css";

interface NavBarProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const MobileNavBar = ({ toggleMenu, isMenuOpen }: NavBarProps) => {
  return (
    <nav className={styles.navbar}>
      <Image
        src={logo}
        height={40}
        width={40}
        alt="funky logo"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      <Hamburger toggled={isMenuOpen} toggle={toggleMenu} />
    </nav>
  );
};

export default MobileNavBar;
