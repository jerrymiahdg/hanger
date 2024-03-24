import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, Context } from "../App";

const Add = () => {
  const [name, setName] = useState("");
  const [wearsUntilWash, setWearsUntilWash] = useState("");
  const navigate = useNavigate();

  const addHandler = (e) => {
    e.preventDefault();

    if (name.length > 0 && wearsUntilWash.length > 0) {
      console.log(name.length > 0 && wearsUntilWash.length > 0);

      fetch(`${API_URL}/clothingItems/createClothingItem`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          name: name,
          wearsUntilWash: wearsUntilWash,
        }),
      })
        .then((res) =>
          res.json().then((res) => {
            console.log(res.res);
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
        onSubmit={addHandler}
      >
        <input
          placeholder="Item name"
          className="p-3 text-center placeholder:focus:opacity-0 placeholder:text-emerald-400 outline-none border border-emerald-300 bg-transparent rounded-md focus:shadow-lg shadow-emerald-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Wears until wash"
          className="p-3 text-center placeholder:focus:opacity-0 placeholder:text-emerald-400 outline-none border border-emerald-300 bg-transparent rounded-md focus:shadow-lg shadow-emerald-400"
          value={wearsUntilWash}
          onChange={(e) => setWearsUntilWash(e.target.value)}
        />
        <button
          type="submit"
          className="hover:opacity-100 opacity-75 bg-emerald-400 transition p-3 rounded-md outline-none focus:shadow-lg shadow-emerald-400"
        >
          Add clothing item
        </button>
      </form>
    </div>
  );
};

export default Add;
