import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RatingStars = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i}>{i < Math.floor(rating) ? "⭐" : ""}</span>
  ));
  return <div className="text-yellow-500 text-2xl">{stars}</div>;
};

const ProductInfo = ({
  product,
  showDescription = false,
  showButtons = true,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success("Thêm vào giỏ thành công");
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success("Đã thêm vào giỏ");
    navigate("/cart");
  };

  return (
    <div className="space-y-4 ">
      <h2 className="text-xl font-bold text-gray-800 py-4">{product.title}</h2>

      {showDescription && (
        <p className="text-gray-600 text-sm">{product.description}</p>
      )}

      <div className="text-red-600 font-semibold text-lg">${product.price}</div>

      <RatingStars rating={product.rating} />

      {showButtons && (
        <div className="flex gap-2 mt-2 py-4">
          <button
            onClick={handleBuyNow}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
          >
            Mua ngay
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
          >
            Thêm vào giỏ
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
