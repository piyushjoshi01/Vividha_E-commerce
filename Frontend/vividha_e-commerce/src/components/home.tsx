import axios from "axios";
import { useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";
import { Product } from "../types/productType";
import ProductCard from "../modules/Products/ProductCard";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const apiUrl =
    "http://internal-BackendLoadBalancer-906025671.us-east-1.elb.amazonaws.com/product/get-all-products";
  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await axios.get<Product[]>(apiUrl);
      setProducts(response.data);
    };
    fetchAllProducts();
  }, []);
  console.log(products);

  return (
    <Container sx={{ mt: 8 }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
