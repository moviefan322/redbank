import { useState, useEffect } from "react";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Use .text() if the response is not JSON
      console.log(data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Use .text() if the response is not JSON
        console.log(data);
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error("User is Not Logged In");
      }
    };

    fetchData();
  }, []);

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
      </div>
    </>
  );
};

export default AdminPage;
