import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context, API_URL } from "../App";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const ctx = useContext(Context);

  useEffect(() => {
    if (ctx.isLoggedIn) {
      navigate("/");
    }
  }, []);

  const signUpHandler = (e) => {
    e.preventDefault();

    if (username.length > 0 && password.length > 0) {
      fetch(`${API_URL}/users/createUser`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) =>
          res.json().then((res) => {
            ctx.setIsLoggedIn(true);
            navigate("/");
          })
        )
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col w-96 justify-self-center border border-emerald-300 rounded-xl p-10 m-20 gap-10"
        onSubmit={signUpHandler}
      >
        <h1 className="text-3xl font-bold">Sign up</h1>
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
          Sign in
        </button>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
