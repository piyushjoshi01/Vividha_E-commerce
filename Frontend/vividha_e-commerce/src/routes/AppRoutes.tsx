import { Route, Routes } from "react-router-dom";

import AddProduct from "../modules/Products/AddProduct";
import UpdateProduct from "../modules/Products/UpdateProduct";
import register from "../modules/User Authentication/Register";
import login from "../modules/User Authentication/Login";
import Home from "../components/Home";
import ProductDetails from "../modules/Products/ProductDetails";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" Component={register} />
        <Route path="/login" Component={login} />
        <Route path="/" Component={Home} />
        <Route path="/add-product" Component={AddProduct} />
        <Route path="/update-product" Component={UpdateProduct} />
        <Route path="/product/:id" Component={ProductDetails} />
      </Routes>
    </>
  );
};

export default AppRoutes;
