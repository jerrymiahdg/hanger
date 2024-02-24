import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "./clocat.png";
import Underline from "./Underline";
import { API_URL, Context } from "../App";

const Nav = () => {
  const ctx = useContext(Context);
  const navigate = useNavigate();

  const logOutClickHandler = () => {
    fetch(`${API_URL}//localhost:3000}/users/logOut`, {
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
    <div className="flex justify-center border-b align-center pl-8 pr-8">
      <div className="flex justify-between max-w-7xl w-full items-center p-5 left-auto right-auto">
        <div className="flex gap-5 items-center">
          <img src={icon} className="invert" width="30px"></img>
          <Link to="/" className="text-3xl font-bold">
            Hanger
          </Link>
          <h3 className="text-sm">A Clothing Management System</h3>
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
