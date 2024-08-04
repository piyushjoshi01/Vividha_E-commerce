import { Route, Routes } from "react-router-dom";

import AddProduct from "../modules/Products/AddProduct";
import UpdateProduct from "../modules/Products/UpdateProduct";

import Home from "../components/Home";
import ProductDetails from "../modules/Products/ProductDetails";
import Register from "../modules/User Authentication/Register";
import Login from "../modules/User Authentication/Login";
import WomenClothes from "../modules/Products/WomenClothes";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/" Component={Home} />
        <Route path="/add-product" Component={AddProduct} />
        <Route path="/update-product" Component={UpdateProduct} />
        <Route path="/product/:id" Component={ProductDetails} />
        <Route path="/womenCategory" Component={WomenClothes} />
      </Routes>
    </>
  );
};

export default AppRoutes;
