import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { BiMenu } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.profile);
  const avatarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    toast.success("Bạn đã đăng xuất thành công!");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-cyan-200 w-full sticky top-0">
      <div className="px-6 py-2">
        <div className="flex items-center justify-between py-2">
          <a className="flex items-center" href="/">
            <img className="w-12 h-12 mr-2" src={Logo} alt="Logo" />
            <span className="font-semibold text-lg">Mobile Shopping</span>
          </a>

          <div className="flex items-center space-x-4">
            <div className="md:hidden">
              <BiMenu
                className="cursor-pointer"
                size="1.875rem"
                onClick={onMenuClick}
                aria-label="Open menu"
              />
            </div>

            <div className="relative" ref={avatarRef}>
              {user ? (
                <>
                  <img
                    className="w-12 h-12 rounded-full bg-white cursor-pointer"
                    src={user?.image || Logo}
                    alt="Avatar"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  />

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg py-2 z-50">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
