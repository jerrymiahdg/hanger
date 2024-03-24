import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "./clocat.png";
import Underline from "./Underline";
import { API_URL, Context } from "../App";

const Nav = () => {
  const ctx = useContext(Context);
  const navigate = useNavigate();

  const logOutClickHandler = () => {
    fetch(`${API_URL}/users/logOut`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "Application/JSON",
      },
      mode: "cors",
      body: JSON.stringify({ hamburger: 3 }),
    })
      .then((res) => {
        ctx.setIsLoggedIn(false);
        navigate("/signup");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center border-b border-emerald-300 shadow-md shadow-emerald-300 align-center bg-emerald-200">
      <div className="flex justify-between max-w-5xl w-full items-center p-5 left-auto right-auto">
        <div className="flex gap-5 items-center">
          <Link to="/" className="flex gap-5 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-emerald-950"
              width="40"
              height="40"
              viewBox="0 0 7.408 5.557"
              id="hanger"
            >
              <path
                d="m 146.5,261.5 c -2.19729,0 -4.00195,1.8027 -4.00195,4 v 0.99805 h 2 V 265.5 c 0,-1.11643 0.88554,-2 2.00195,-2 1.11642,0 2,0.88357 2,2 0,1.1164 -0.88358,2.00195 -2,2.00195 h -0.99609 v 0.9961 1.0039 0.41211 L 132.5,277.91408 v 4.58593 h 1.00391 l 26.99609,0.002 v -4.58593 l -12.99609,-7.9961 v -0.5625 C 149.21784,268.90589 150.5,267.3488 150.5,265.5 c 0,-2.1973 -1.8027,-4 -4,-4 z m 0,10.15039 11.99805,7.43359 V 280.5 L 134.5,280.49806 v -1.41602 z"
                color="#000"
                font-family="sans-serif"
                font-weight="400"
                overflow="visible"
                transform="translate(-35.057 -69.189) scale(.26458)"
              ></path>
            </svg>
            <h1 className="text-3xl font-bold hidden sm:block">Hanger</h1>
          </Link>
        </div>
        <div className="flex gap-10">
          {ctx.isLoggedIn ? (
            <>
              <Link to="/add" className="group">
                Add
                <Underline prop="/add" />
              </Link>
              <Link to="/edit-catalogue" className="group">
                Edit Catalogue
                <Underline prop="/edit-catalogue" />
              </Link>
              <Link className="group" onClick={logOutClickHandler}>
                Log out
                <Underline />
              </Link>
            </>
          ) : (
            <>
              <Link to="/about-us" className="group">
                About us
                <Underline prop="/about-us" />
              </Link>
              <Link to="/login" className="group">
                Log in
                <Underline prop="/login" />
              </Link>
              <Link to="/signup" className="group">
                Sign up
                <Underline prop="/signup" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
