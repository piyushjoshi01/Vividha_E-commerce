import { Route, Routes } from "react-router-dom";
import home from "../components/home";
import addProduct from "../modules/Products/add-product";
import updateProduct from "../modules/Products/update-product";
import register from "../modules/User Authentication/register";
import login from "../modules/User Authentication/login";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" Component={register} />
        <Route path="/login" Component={login} />
        <Route path="/home" Component={home} />
        <Route path="/add-product" Component={addProduct} />
        <Route path="/update-product" Component={updateProduct} />
      </Routes>
    </>
  );
};

export default AppRoutes;
