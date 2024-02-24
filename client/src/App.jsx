import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import CloCat from "./pages/CloCat";
import { createContext, useEffect, useState } from "react";
import Add from "./pages/Add";
import Edit from "./pages/Edit";

export const Context = createContext();

// export const API_URL = "http://localhost:3000";

export const API_URL = "https://hanger-2p25.onrender.com";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/users/isLoggedIn`, {
      credentials: "include",
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.isLoggedIn) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Context.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        <div className="flex flex-col h-screen">
          <Nav />
          <Routes>
            <Route path="/" element={<CloCat />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
            <Route path="add" element={<Add />} />
            <Route path="edit-catalogue" element={<Edit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
