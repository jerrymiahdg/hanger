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
              "Loading..."
            )}
          </h1>
        </div>
      )}
      <div className="flex justify-center w-full px-5 py-10">
        <div className="max-w-5xl w-full">
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
                      <a className="text-red-300 font-bold">wash now</a>
                      <button
                        className="p-1 bg-white opacity-75 text-gray-800 rounded-md hover:opacity-100"
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
