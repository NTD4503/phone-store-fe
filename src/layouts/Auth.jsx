import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/user/userThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isLoggedIn } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Đăng nhập thành công");
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              className="w-full border rounded px-3 py-2"
              type="text"
              value={username}
              placeholder="emilys"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <div className="relative">
              <input
                className="w-full border rounded px-3 py-2 pr-10"
                type={showPwd ? "text" : "password"}
                value={password}
                placeholder="emilyspass"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className=" absolute top-4 right-4 text-sm text-gray-500"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Auth;
