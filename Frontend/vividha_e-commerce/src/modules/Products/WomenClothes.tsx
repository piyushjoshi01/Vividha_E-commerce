import axios from "axios";
import React, { useEffect, useState } from "react";
import { Product } from "../../types/productType";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard"; // Adjust the import path as necessary

const WomenClothes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [womenClothes, setWomenClothes] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:8000/product/get-all-products"
        );
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
