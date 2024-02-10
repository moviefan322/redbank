import { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth`,
        { username, password }
      );
      console.log(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`,
        { withCredentials: true }
      );
      console.log(response.data);
      setIsLoggedIn(response.data.isLoggedIn);
    } catch (error) {
      console.error("User is Not Logged In");
    }
  };

  const testCookieSet = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/test/cookieSet`
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  const testCookieCheck = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/test/cookieCheck`,
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isLoggedIn]);

  console.log(isLoggedIn);
  return (
    <>
      <div className="d-flex flex-column align-self-center">
        <h1 className="text-center mx-auto my-5">Admin Portal</h1>

        {isLoggedIn ? (
          <div>
            <h2 className="text-center mx-auto mt-5">Welcome, Admin</h2>
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
        <button className="btn-admin" onClick={testCookieSet}>
          Test Set
        </button>
        <button className="btn-admin" onClick={testCookieCheck}>
          Test Check
        </button>
        <button className="btn-admin" onClick={fetchUser}>
          Test User
        </button>
      </div>
    </>
  );
};

export default AdminPage;
