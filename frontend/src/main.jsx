import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./pages/Admin/PrivateRoute.jsx";

// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Profile from "./pages/User/Profile";

import AdminRoute from "./pages/Admin/AdminRoute.jsx"
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route path="admin/profile" element={<Profile />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="admin/userlist" element={<UserList />} />
        <Route path="admin/categorylist" element={<CategoryList />} />
        <Route path="admin/allproductslist" element={<AllProducts />} />
        <Route path="admin/productlist/:pageNumber" element={<ProductList />} />
        <Route path="admin/product/update/:_id" element={<ProductUpdate />} />
      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

