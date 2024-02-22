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
        className="flex flex-col w-96 justify-self-center border rounded-xl p-10 m-20 gap-10"
        onSubmit={addHandler}
      >
        <input
          placeholder="Item name"
          className="p-3 text-center border bg-transparent rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Wears until this item needs a wash"
          className="p-3 text-center border bg-transparent rounded-md"
          value={wearsUntilWash}
          type="number"
          onChange={(e) => setWearsUntilWash(e.target.value)}
        />
        <button
          type="submit"
          className="hover:opacity-100 opacity-75 bg-slate-100 text-slate-800 transition p-3 rounded-md"
        >
          Add clothing item
        </button>
      </form>
    </div>
  );
};

export default Add;
