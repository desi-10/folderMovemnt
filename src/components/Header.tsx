import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { loggedInUser } = useContext(AuthContext);
  return (
    <nav className="sticky top-0 left-0 right-0 flex justify-between items-center border-b-2 pb-3 bg-white p-5 capitalize dark:bg-gray-900 dark:border-gray-700">
      <h5 className="text-sm dark:text-gray-300">Ho Municipal Hospital</h5>
      <div className="flex items-center">
        <p className="text-sm">{loggedInUser?.username}</p>
        <p className="h-7 w-7 rounded-full text-center text-sm bg-red-600 pt-1 ml-2 text-white dark:bg-red-700 dark:text-gray-400">
          {loggedInUser?.username.charAt(0)}
        </p>
      </div>
    </nav>
  );
};

export default Header;
