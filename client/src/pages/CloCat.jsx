import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, Context } from "../App";
import ExpandLess from "../components/ExpandLess";
import ExpandMore from "../components/ExpandMore";

const CloCat = () => {
  const ctx = useContext(Context);
  const navigate = useNavigate();
  const [clothingItems, setClothingItems] = useState([]);
  const [clothingItemsFetched, setClothingItemsFetched] = useState(false);

  useEffect(() => {
    if (!ctx.isLoggedIn) {
      navigate("/signup");
    }
    fetch(`${API_URL}/clothingItems`, { credentials: "include" }).then((res) =>
      res.json().then((data) => {
        setClothingItems(data);
        setClothingItemsFetched(true);
      })
    );
  }, []);

  const incrementNumWearsHandler = (id) => () => {
    fetch(`${API_URL}/clothingItems/incrementNumWearsById`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        id: id,
      }),
    }).then((res) => res.json().then((data) => setClothingItems(data)));
  };

  const decrementNumWearsHandler = (id) => () => {
    fetch(`${API_URL}/clothingItems/decrementNumWearsById`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        id: id,
      }),
    }).then((res) => res.json().then((data) => setClothingItems(data)));
  };

  const washedClickHandler = (id) => () => {
    fetch(`${API_URL}/clothingItems/resetNumWearsById`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        id: id,
      }),
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
        <div className="max-w-3xl w-full">
          <div className="flex flex-col gap-10 w-full">
            {clothingItems.map((item) => (
              <div
                className="p-8 border border-emerald-300 rounded-2xl"
                key={item.id}
              >
                <h1 className="font-bold text-4xl">{item.name}</h1>
                <div className="flex items-center gap-2 pt-1">
                  <h2>{item.numWears} wears</h2>
                  <div
                    className="bg-emerald-300 rounded-full opacity-75 hover:opacity-100 cursor-pointer transition-all"
                    onClick={incrementNumWearsHandler(item.id)}
                  >
                    <ExpandLess />
                  </div>
                  <div
                    className="bg-emerald-300 rounded-full opacity-75 hover:opacity-100 cursor-pointer transition-all"
                    onClick={decrementNumWearsHandler(item.id)}
                  >
                    <ExpandMore />
                  </div>
                </div>
                <h1 className="mt-3">
                  {item.wearsUntilWash - item.numWears > 0 ? (
                    <>
                      <a className="text-indigo-500 font-bold">
                        {item.wearsUntilWash - item.numWears}
                      </a>{" "}
                      more wears until needs wash
                    </>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <a className="text-red-600 font-bold">wash now</a>
                      <button
                        className="p-1 bg-emerald-300 opacity-75 rounded-md hover:opacity-100"
                        onClick={washedClickHandler(item.id)}
                      >
                        washed?
                      </button>
                    </div>
                  )}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CloCat;
