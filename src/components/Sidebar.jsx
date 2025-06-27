import { Link } from "react-router-dom";
import { CiShop } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import { IoPerson, IoClose } from "react-icons/io5";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";

const defaultIconsSize = "1.875rem";

const items = [
  { to: "/", label: "Shop", icon: <CiShop size={defaultIconsSize} /> },
  {
    to: "/cart",
    label: "Cart",
    icon: <TiShoppingCart size={defaultIconsSize} />,
  },
  {
    to: "/profile",
    label: "My Profile",
    icon: <IoPerson size={defaultIconsSize} />,
  },
];

const NavItem = ({ item, isActive, onClick, isCollapsed }) => (
  <li
    onClick={onClick}
    className={`flex p-2 items-center cursor-pointer rounded ${
      isActive ? "bg-cyan-300" : "hover:bg-gray-100"
    }`}
  >
    <Link to={item.to} className="flex items-center w-full">
      {item.icon}
      {!isCollapsed && <h3 className="ml-2">{item.label}</h3>}
    </Link>
  </li>
);

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className={`border border-r-gray-500-1 ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-500`}
    >
      <aside className="hidden md:block bg-white col-span-1 h-full p-4 transition-all duration-300">
        <div className="flex items-center justify-between mb-4 px-2">
          {!isCollapsed ? (
            <h4 className="text-lg font-bold uppercase text-primary">Menu</h4>
          ) : (
            ""
          )}

          <BiMenu
            onClick={onToggleCollapse}
            className="cursor-pointer"
            size="1.875rem"
            aria-label="Toggle sidebar"
          />
        </div>

        <ul>
          {items.map((item, idx) => (
            <NavItem
              key={idx}
              item={item}
              isActive={activeIndex === idx}
              onClick={() => setActiveIndex(idx)}
              isCollapsed={isCollapsed}
            />
          ))}
        </ul>
      </aside>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={onClose}
          ></div>

          <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 p-4 shadow-lg md:hidden">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold uppercase text-primary">Menu</h4>
              <IoClose
                size={defaultIconsSize}
                className="cursor-pointer"
                onClick={onClose}
              />
            </div>

            <ul>
              {items.map((item, idx) => (
                <NavItem
                  key={idx}
                  item={item}
                  isActive={activeIndex === idx}
                  onClick={() => setActiveIndex(idx)}
                  isCollapsed={false}
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
