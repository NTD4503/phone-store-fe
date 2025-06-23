// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./layouts/Main";
import Auth from "./layouts/Auth";

import Shop from "./pages/Shop";
import Product from "./pages/DetailProduct";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Test from "./pages/Test";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Shop />} />

          <Route path="/product/:id" element={<Product />} />
          <Route path="/product" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/test" element={<Test />} />
        </Route>
        <Route path="/login" element={<Auth />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
