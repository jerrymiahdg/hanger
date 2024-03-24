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
              <div className="flex gap-10 items-center">
                <svg
                  class="text-emerald-300 animate-spin"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                >
                  <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-gray-900"
                  ></path>
                </svg>
              </div>
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
