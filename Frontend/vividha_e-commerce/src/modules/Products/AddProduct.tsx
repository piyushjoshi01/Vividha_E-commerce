import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Product } from "../../types/productType";

const AddProduct = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      name: "",
      price: 0,
      available: false,
      images: [""],
      sizes: [""],
      _id: undefined,
      category: "",
      stock: 0,
    },
  ]);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const values = [...products];
    const { name, value } = event.target;

    if (name === "images" || name === "sizes") {
      values[index][name as "images" | "sizes"] = value.split(",");
    } else if (name === "price" || name === "stock") {
      values[index][name as "price" | "stock"] = parseFloat(value);
    } else if (name === "available") {
      values[index][name as "available"] = value === "true";
    } else {
      values[index][name as "name" | "category"] = value;
    }
    setProducts(values);
  };

  const handleAddForm = () => {
    setProducts([
      ...products,
      {
        name: "",
        price: 0,
        available: false,
        images: [""],
        sizes: [""],
        _id: undefined,
        category: "",
        stock: 0,
      },
    ]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/product/add-new-product",
        products
      );
      toast.success("Products added successfully");
    } catch (error) {
      console.error("Error adding products:", error);
      toast.error("Failed to add products");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl mb-4">Add Products</h2>
      <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={index} className="border p-4 mb-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={(event) => handleChange(index, event)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={(event) => handleChange(index, event)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Availability</label>
              <select
                name="available"
                value={String(product.available)}
                onChange={(event) => handleChange(index, event)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="true">Available</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={(event) => handleChange(index, event)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={(event) => handleChange(index, event)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Images (comma-separated URLs)
              </label>
              <input
                type="text"
                name="images"
                value={product.images.join(",")}
                onChange={(event) => handleChange(index, event)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Sizes (comma-separated)
              </label>
              <input
                type="text"
                name="sizes"
                value={product.sizes.join(",")}
                onChange={(event) => handleChange(index, event)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddForm}
          className="w-full bg-blue-500 text-white p-2 rounded mb-4"
        >
          + Add Another Product
        </button>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Submit Products
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
