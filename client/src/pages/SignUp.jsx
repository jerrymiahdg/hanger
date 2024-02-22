import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context, API_URL } from "../App";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const ctx = useContext(Context);

  if (ctx.isLoggedIn) {
    navigate("/");
  }

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
        className="flex flex-col w-96 justify-self-center border rounded-xl p-10 m-20 gap-10"
        onSubmit={signUpHandler}
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
          Sign up
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-300">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
