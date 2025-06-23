import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/cart/cartSlice";
import { BreadcrumbsWithIcon } from "../components/BeardScrumb";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vat = total * 0.1;
  const grandTotal = total + vat;

  return (
    <div className="relative overflow-x-auto sm:rounded-lg bg-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 px-4">Cart</h1>
      <BreadcrumbsWithIcon />
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h2>
        {cartItems.length === 0 ? (
          <p className="text-center mt-10 text-lg">Giỏ hàng trống.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-6 gap-4 items-center border-b pb-4"
                >
                  <div className="col-span-1">
                    <img
                      src={item.thumbnail || item.image}
                      alt={item.title}
                      className="w-full rounded"
                    />
                  </div>

                  <div className="col-span-3">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600 py-2">{item.description}</p>
                    <h3 className="text-lg font-semibold">${item.price}</h3>
                    <div className="flex gap-2 items-center mt-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 flex justify-end">
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Xoá
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right space-y-2">
              <p>
                Tạm tính: <strong>${total.toFixed(2)}</strong>
              </p>
              <p>
                VAT (10%): <strong>${vat.toFixed(2)}</strong>
              </p>
              <p className="text-xl font-bold">
                Tổng cộng: ${grandTotal.toFixed(2)}
              </p>

              <button
                onClick={() => dispatch(clearCart())}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Xoá toàn bộ giỏ hàng
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
