import { Breadcrumbs } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";

export function BreadcrumbsWithIcon() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const pathSegments = location.pathname.split("/").filter(Boolean);

  const format = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");

  const handleNavigate = (href) => {
    navigate(href);
  };

  return (
    <div className="flex justify-between items-center">
      <Breadcrumbs>
        <span
          onClick={() => handleNavigate("/")}
          className="cursor-pointer flex items-center gap-2 text-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Home
        </span>

        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          return isLast ? (
            <span key={index} className="px-1 gap-2 text-2xl">
              {format(segment)}
            </span>
          ) : (
            <span
              key={index}
              onClick={() => handleNavigate(href)}
              className="px-1 cursor-pointer gap-2 text-2xl"
            >
              {format(segment)}
            </span>
          );
        })}
      </Breadcrumbs>

      <div
        className="relative cursor-pointer"
        onClick={() => navigate("/cart")}
        title="Giỏ hàng"
      >
        <TiShoppingCart
          className="h-8 w-8 text-gray-700 hover:text-gray-900 transition"
          size={32}
        />
        {cartQuantity > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cartQuantity}
          </span>
        )}
      </div>
    </div>
  );
}
