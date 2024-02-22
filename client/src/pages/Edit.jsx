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
                <Link to="/add" className="text-blue-300">
                  add your first one
                </Link>
              </>
            ) : (
              "Loading..."
            )}
          </h1>
        </div>
      )}
      <div className="flex justify-center w-full pl-8 pr-8">
        <div className="max-w-7xl w-full">
          <div className="flex justify-center gap-20 w-full items-center flex-wrap p-20">
            {clothingItems.map((item) => (
              <div className="p-8 border rounded-2xl flex flex-col gap-2">
                <h1 className="font-bold text-xl">
                  Name:{" "}
                  <input
                    className="font-normal"
                    value={item.name}
                    onChange={nameInputChangeHandler(item.id)}
                  />
                </h1>
                <h1 className="font-bold text-xl">
                  Wears until wash:{" "}
                  <input
                    className="font-normal"
                    value={item.wearsUntilWash}
                    type="number"
                    onChange={wearsUntilWashInputChangeHandler(item.id)}
                  />
                </h1>
                <button
                  className="bg-white opacity-75 p-1 text-gray-800 rounded-sm hover:opacity-100 w-fit transition-all"
                  onClick={deleteClickHandler(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              className="bg-white opacity-75 p-1 text-gray-800 rounded-sm hover:opacity-100 w-fit transition-all"
              onClick={saveChangesClickHandler}
            >
              Save changes
            </button>{" "}
            <button
              className="bg-white opacity-75 p-1 text-gray-800 rounded-sm hover:opacity-100 w-fit transition-all"
              onClick={resetClickHandler}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
