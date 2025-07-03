import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  updateQuantity,
} from "../redux/cart/cartSlice";
import { Typography } from "antd";
const { Title } = Typography;

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vat = total * 0.1;
  const grandTotal = total + vat;

  const token = useSelector((state) => state.user.token);

  if (!token) {
    return (
      <div className="p-6 bg-white rounded-lg">
        <Title level={2}>Giỏ hàng</Title>
        <p className="text-lg mt-4 text-red-600">
          Vui lòng đăng nhập để sử dụng giỏ hàng.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg bg-white p-4 h-full">
      <div className="bg-white rounded-lg p-6">
        <Title level={2}>Giỏ hàng của bạn</Title>
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

                      <input
                        min={1}
                        step={1}
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);

                          if (
                            !isNaN(value) &&
                            value > 0 &&
                            Number.isInteger(value)
                          ) {
                            dispatch(
                              updateQuantity({ id: item.id, quantity: value })
                            );
                          }
                        }}
                        className="w-14 text-center border rounded"
                      />

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
