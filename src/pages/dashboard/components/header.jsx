import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import { signOut } from "../../../services/auth";


const Header = () => {
  const navigate = useNavigate();
  const [isDropdown, setIsDropdown] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleSignOut = async () => {
    try {
      await signOut();

      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      
      navigate("/");
    } catch (error) {
      alert("Signout failed, please try again");
    }
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-40 px-5 py-1 bg-gray-400">
      <div className="flex justify-end w-full h-full">
        <div className="flex items-center h-full gap-5 w-fit">
          <div className="w-auto h-auto">
            <Icon
              icon="mdi:bell-outline"
              width="26"
              height="26"
              style={{ color: "#ffffff" }}
            />
          </div>
          <div className="relative w-auto h-auto ">
            <button
              onClick={toggleDropdown}
              className="flex items-center w-full h-full gap-3 px-2 py-3 rounded-md"
            >
              <Icon
                icon="mdi:account-box-outline"
                width="30"
                height="30"
                style={{ color: "#ffffff" }}
              />
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold text-white">User Name</span>
                <span className="text-sm font-bold text-white">(Admin)</span>
              </div>
              {
                isDropdown ? (
                  <Icon
                    icon="mdi:chevron-up"
                    width="26"
                    height="26"
                    style={{ color: "#ffffff" }}
                  />
                ) : (
                  <Icon
                    icon="mdi:chevron-down"
                    width="26"
                    height="26"
                    style={{ color: "#ffffff" }}
                  />
                )
              }
              {isDropdown && (
                <div className="absolute top-[65px] right-[-2px] w-[180px] py-[10px] px-[5px] bg-white border border-gray-200 rounded-md shadow-md font-bold">
                  <ul className="space-y-2">
                    <li className="w-full flex items-center justify-start px-3 py-2 rounded-[5px] hover:bg-gray-300">
                      <Icon icon="pajamas:settings" width="26" height="26"  style={{color: "#000000"}} />
                      <Link
                        to="/dashboard/settings"
                        className="block w-full text-center"
                      >
                        Settings
                      </Link>
                    </li>
                    <li className="w-full flex items-center justify-start px-3 py-2 rounded-[5px] hover:bg-gray-300" onClick={handleSignOut}>
                      <Icon icon="majesticons:logout-line" width="28" height="28"  style={{color: "#000000"}}/>
                      <Link
                        to=""
                        className="block w-full text-center"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;