import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, Context } from "../App";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const ctx = useContext(Context);
  const navigate = useNavigate();

  if (ctx.isLoggedIn) {
    navigate("/");
  }

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    if (!ctx.loggedIn) {
      fetch(`${API_URL}/users/logIn`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "Application/JSON",
        },
        mode: "cors",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }).then((res) =>
        res.json().then((data) => {
          if (data.validCredentials) {
            navigate("/");
            ctx.setIsLoggedIn(true);
          }
        })
      );
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col w-96 justify-self-center border rounded-xl p-10 m-20 gap-10"
        onSubmit={loginSubmitHandler}
      >
        <input
          placeholder="Username"
          className="p-3 text-center border bg-transparent rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          className="p-3 text-center border bg-transparent rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button
          type="submit"
          className="hover:opacity-100 opacity-75 bg-slate-100 text-slate-800 transition p-3 rounded-md"
        >
          Log in
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-300">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
