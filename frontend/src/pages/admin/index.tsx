import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { loginUser } from "../../features/auth/authActions";
import { setCredentials } from "../../features/auth/authSlice";
import { useGetUserDetailsQuery } from "@/services/auth/authService";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/configureStore";
import LoginData from "../../types/LoginData";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch() as ThunkDispatch<RootState, null, AnyAction>;

  const state = useSelector((state: any) => state.auth, shallowEqual);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const { data, error, refetch } = useGetUserDetailsQuery("userDetails", {
    refetchOnMountOrArgChange: true,
    skip: !state.token,
  });

  useEffect(() => {
    if (state.token && data) {
      dispatch(setCredentials(data));
    }
  }, [state.token, data, dispatch]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      if (username && [password]) {
        const packageData: LoginData = {
          username,
          password,
        };

        dispatch(loginUser(packageData));
      }
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  console.log(data);
  return (
    <>
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
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column my-5">
            <h2 className="text-center mx-auto">Please Log In</h2>
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
    </>
  );
};

export default AdminPage;
