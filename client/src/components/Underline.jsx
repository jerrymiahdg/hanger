import { useLocation } from "react-router-dom";

const Underline = ({ prop }) => {
  const path = useLocation().pathname;

  return (
    <div
      className={`${
        path === prop ? "w-full" : "w-0"
      } bg-white h-px group-hover:w-full ease-in transition-all`}
    ></div>
  );
};

export default Underline;
