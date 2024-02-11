import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/bootstrap.scss";
import "@/styles/globals.css";
import { useState } from "react";
import Head from "next/head";
import DesktopNavBar from "@/components/DesktopNavBar";
import MobileNavBar from "@/components/MobileNavBar";
import SideMenu from "@/components/SideMenu";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import styles from "./_app.module.css";
import { store } from "../store/configureStore";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // Update the state to the current window width after mounting
    setWindowWidth(window.innerWidth);
    if (window.location.pathname.startsWith("/admin")) {
      setAdmin(true);
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  if (typeof windowWidth === "undefined") {
    return null;
  }

  if (admin) {
    return (
      <Provider store={store}>
        <div className={styles.admin}>
          <Component {...pageProps} />
        </div>
      </Provider>
    );
  }

  return (
    <>
      <Head>
        <title>Redbank</title>
        <meta name="description" content="Description of my page" />
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />

        {/* You can add more tags here as needed */}
      </Head>
      <Provider store={store}>
        <div
          className={`${styles.pageContainer} ${
            menuOpen ? `${styles.slide}` : ""
          }`}
        >
          {windowWidth > 868 ? (
            <DesktopNavBar />
          ) : (
            <MobileNavBar toggleMenu={toggleMenu} isMenuOpen={menuOpen} />
          )}
          <Component {...pageProps} />
        </div>
        {windowWidth < 868 ? <SideMenu isOpen={menuOpen} /> : null}
      </Provider>
    </>
  );
}
