import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { Product } from "../../types/productType";
import { toast } from "react-toastify";

export interface UpdateProduct {
  _id: any;
  name: string;
  price: number;
  category: string;
  available: boolean;
  stock: number;
  images: string[];
  sizes: string[];
}

const UpdateProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await axios.get<Product[]>(
        "http://localhost:8000/product/get-all-products"
      );
      setProducts(response.data);
    };
    fetchAllProducts();
  }, []);

  const handleTextChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedProducts = [...products];
    if (name === "price" || name === "stock") {
      updatedProducts[index][name as "price" | "stock"] = parseFloat(value);
    } else {
      updatedProducts[index][name as "name" | "category"] = value;
    }
    setProducts(updatedProducts);
  };

  const handleSelectChange = (
    index: number,
    event: SelectChangeEvent<"true" | "false">
  ) => {
    const { name, value } = event.target;
    const updatedProducts = [...products];
    updatedProducts[index][name as "available"] = value === "true";
    setProducts(updatedProducts);
  };

  const handleUpdate = async (index: number) => {
    const { _id, ...productWithoutId } = products[index];
    console.log("Update Product", productWithoutId);

    try {
      await axios.put(
        `http://localhost:8000/product/updateProduct/${_id}`,
        productWithoutId
      );
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async (index: number) => {
    const product = products[index];
    try {
      await axios.post(`http://localhost:8000/product/deleteProduct`, {
        id: product._id,
      });
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item xs={12} key={product._id}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={product.name}
                  onChange={(event) => handleTextChange(index, event)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={product.price || ""}
                  onChange={(event) => handleTextChange(index, event)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  value={product.category}
                  onChange={(event) => handleTextChange(index, event)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Stock"
                  name="stock"
                  type="number"
                  value={product.stock || ""}
                  onChange={(event) => handleTextChange(index, event)}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Available</InputLabel>
                  <Select
                    name="available"
                    value={product.available ? "true" : "false"}
                    onChange={(event) => handleSelectChange(index, event)}
                  >
                    <MenuItem value="true">Available</MenuItem>
                    <MenuItem value="false">Out of Stock</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdate(index)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UpdateProduct;
