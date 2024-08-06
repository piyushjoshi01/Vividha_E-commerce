import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../types/productType";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard"; // Adjust the import path as necessary

const WomenClothes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [womenClothes, setWomenClothes] = useState<Product[]>([]);
  const apiUrl =
    "http//:internal-BackendLoadBalancer-294495114.us-east-1.elb.amazonaws.com/product/get-all-products";
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get<Product[]>(apiUrl);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) => product.category === "Category 2"
    );
    setWomenClothes(filteredProducts);
  }, [products]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Women's Clothes
      </Typography>
      <Grid container spacing={4}>
        {womenClothes.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WomenClothes;
