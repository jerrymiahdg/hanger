import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, Context } from "../App";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const ctx = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (ctx.isLoggedIn) {
      navigate("/");
    }
  }, []);

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
    <div className="flex justify-center h-screen items-center px-5">
      <form
        className="flex flex-col max-w-lg w-full justify-self-center border translate-y-[-81px] border-emerald-300 rounded-xl px-5 py-10 gap-10"
        onSubmit={loginSubmitHandler}
      >
        <h1 className="text-3xl font-bold">Log in</h1>
        <input
          placeholder="Username"
          className="p-3 placeholder:focus:opacity-0 placeholder:text-emerald-400 outline-none border border-emerald-300 bg-transparent rounded-md focus:shadow-lg shadow-emerald-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          className="p-3 placeholder:focus:opacity-0 placeholder:text-emerald-400 outline-none border border-emerald-300 bg-transparent rounded-md focus:shadow-lg shadow-emerald-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button
          type="submit"
          className=" hover:opacity-100 opacity-75 bg-emerald-400 transition p-3 rounded-md outline-none focus:shadow-lg shadow-emerald-400"
        >
          Log in
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
