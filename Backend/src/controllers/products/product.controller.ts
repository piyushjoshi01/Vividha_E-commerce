import { Request, Response } from "express";
import { Product } from "../../types/productType";
import productServices from "../../services/products/product.services";

class ProductController {
  constructor() {}

  async addProducts(req: Request, res: Response): Promise<void> {
    const products = req.body as Product[];

    console.log("Received products:", products);

    if (!Array.isArray(products) || products.length === 0) {
      res
        .status(400)
        .json({ message: "Invalid input, expected an array of products" });
      return;
    }
    try {
      console.log("Calling addNewProduct service method");

      const result = await productServices.addNewProduct(products);
      res.status(201).json({ message: "Products added successfully", result });
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server Error");
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const result = await productServices.getAllProducts();

      console.log(result);

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const result = await productServices.getProductByID(id);

      console.log(result);

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      throw new Error("Internal Server error");
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = req.body;

    try {
      const result = await productServices.updateProduct(id, product);

      if (result == "Product Updated Successfully") {
        res.status(200).json({ message: "Product Updated" });
        console.log(product);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.body;

    const result = await productServices.deleteProduct(id);

    if (result == "Product Deleted Successfully") {
      res.status(200).json({ message: " Product Deleted" });
    } else {
      res.status(500).json({ message: "Failed to Delete the Product" });
    }
  }
}

export default new ProductController();
