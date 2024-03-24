import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, Context } from "../App";
import ExpandLess from "../components/ExpandLess";
import ExpandMore from "../components/ExpandMore";

const Edit = () => {
  const ctx = useContext(Context);
  const navigate = useNavigate();
  const [clothingItems, setClothingItems] = useState([]);
  const [clothingItemsFetched, setClothingItemsFetched] = useState(false);

  if (!ctx.isLoggedIn) {
    navigate("/signup");
  }

  useEffect(() => {
    fetch(`${API_URL}/clothingItems`, { credentials: "include" }).then((res) =>
      res.json().then((data) => {
        setClothingItems(data);
        setClothingItemsFetched(true);
      })
    );
  }, []);

  const resetClickHandler = () => {
    fetch(`${API_URL}/clothingItems`, { credentials: "include" }).then((res) =>
      res.json().then((data) => {
        setClothingItems(data);
        setClothingItemsFetched(true);
      })
    );
  };

  const nameInputChangeHandler = (id) => (e) => {
    setClothingItems((prev) => {
      const copy = [...prev];
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].id === id) {
          copy[i].name = e.target.value;
        }
      }
      return copy;
    });
  };

  const deleteClickHandler = (id) => () => {
    setClothingItems((prev) => {
      const copy = [...prev];
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].id === id) {
          copy.splice(i, 1);
        }
      }
      return copy;
    });
  };

  const wearsUntilWashInputChangeHandler = (id) => (e) => {
    setClothingItems((prev) => {
      const copy = [...prev];
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].id === id) {
          copy[i].wearsUntilWash = e.target.value;
        }
      }
      return copy;
    });
  };

  const saveChangesClickHandler = () => {
    fetch(`${API_URL}/clothingItems/saveEdits`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clothingItems),
    }).then((res) => res.json().then((data) => setClothingItems(data)));
  };

  return (
    <>
      {clothingItems.length <= 0 && (
        <div className="flex p-20 justify-center h-full items-center">
          <h1 className="text-3xl">
            {clothingItemsFetched ? (
              <>
                You have no clothing items,{" "}
                <Link to="/add" className="text-indigo-500">
                  add your first one
                </Link>
              </>
            ) : (
              "Loading..."
            )}
          </h1>
        </div>
      )}
      <div className="flex justify-center w-full px-5 py-10">
        <div className="max-w-5xl w-full">
          <div className="flex flex-col gap-10 w-full">
            {clothingItems.map((item) => (
              <div className="p-8 border border-emerald-300 rounded-2xl flex flex-col gap-5">
                <div className="flex gap-2 w-full">
                  <h1 className="font-bold text-xl">Name:</h1>
                  <input
                    className="font-normal bg-transparent border-b border-emerald-400 w-full"
                    value={item.name}
                    onChange={nameInputChangeHandler(item.id)}
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <h1 className="font-bold text-nowrap text-xl">
                    Wears until wash:
                  </h1>
                  <input
                    className="font-normal bg-transparent border-b border-emerald-400 w-full"
                    value={item.wearsUntilWash}
                    onChange={wearsUntilWashInputChangeHandler(item.id)}
                  />
                </div>
                <button
                  className="bg-emerald-300 opacity-75 p-1 rounded-sm hover:opacity-100 w-full transition-all"
                  onClick={deleteClickHandler(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="flex gap-3">
              <button
                className="bg-emerald-300 opacity-75 p-2 rounded-sm hover:opacity-100 w-fit transition-all"
                onClick={saveChangesClickHandler}
              >
                Save changes
              </button>{" "}
              <button
                className="bg-emerald-300 opacity-75 p-2 rounded-sm hover:opacity-100 w-fit transition-all"
                onClick={resetClickHandler}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
