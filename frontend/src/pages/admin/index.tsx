import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { loginUser } from "../../features/auth/authActions";
import { RootState } from "../../store/configureStore";
import useUserDetails from "@/hooks/userCredentials";
import LoginData from "../../types/LoginData";
import styles from "./index.module.css";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const dispatch = useAppDispatch();

  const { data, isLoggedIn } = useUserDetails();
  const { error } = useAppSelector((state: RootState) => state.auth) as {
    error: string;
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      if (username && password) {
        const packageData: LoginData = {
          username,
          password,
        };

        await dispatch(loginUser(packageData));

        if (!isLoggedIn && error) {
          setLoginError("Invalid username or password.");
        }
      } else {
        setLoginError("Please enter a username and password.");
      }
    } catch (error) {
      setLoginError("An error occurred while logging in. Please try again.");
    }
  };

  console.log(data);
  console.log(typeof error);
  return (
    <div className="admin">
      <div className="d-flex flex-column align-self-center">
        <h1 className="text-center mx-auto my-5">Admin Portal</h1>
        {isLoggedIn ? (
          <div>
            <h2 className="text-center mx-auto mt-5">Welcome, Admin</h2>
            <h3>What would you like to do?</h3>
            <div className="d-flex flex-column w-100 align-items-center my-5">
              {" "}
              <Link
                className="btn-admin admin-link fs-4 border border-2 border-light w-75 my-2"
                href="/admin/ManageCarousel"
              >
                Manage Carousel
              </Link>
              <Link
                className="btn-admin admin-link fs-4 border border-2 border-light w-75 my-2"
                href="/admin/ManageNews"
              >
                Manage News
              </Link>
              <Link
                className="btn-admin admin-link fs-4 border border-2 border-light w-75 my-2"
                href="/admin/ManageEvents"
              >
                Manage Events
              </Link>
              <Link
                className="btn-admin admin-link fs-4 border border-2 border-light w-75 my-2"
                href="/admin/ManageNewsletters"
              >
                Manage Newsletters
              </Link>
              <Link
                className="btn-admin admin-link fs-4 border border-2 border-light w-75 my-2"
                href="/admin/ManageGiftCards"
              >
                Manage Gift Cards
              </Link>
              <Link
                className="btn-admin admin-link fs-4 border border-2 border-light w-75 my-2"
                href="/admin/ManageBoardMembers"
              >
                Manage Board Members
              </Link>
              <Link
                className="btn-admin admin-link fs-4 border border-2 border-light w-75 my-2"
                href="/admin/ManageBusinesses"
              >
                Manage Businesses
              </Link>
              <Link
                className="btn-admin admin-link fs-4 border border-2 border-light w-75 my-2"
                href="/admin/ManageLodging"
              >
                Manage Lodging
              </Link>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column my-5 w-100">
            <h2 className="text-center mx-auto">Please Log In</h2>
            {loginError && (
              <div className={styles.errorContainer}>
                <p className="text-center text-danger fw-bold">{loginError}</p>
              </div>
            )}
            {error && (
              <div className={styles.errorContainer}>
                <p className="text-center text-danger fw-bold">{error}</p>
              </div>
            )}
            <form className="d-flex flex-column my-2">
              <input
                className="mb-3"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="mb-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn-admin" onClick={handleLogin}>
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
