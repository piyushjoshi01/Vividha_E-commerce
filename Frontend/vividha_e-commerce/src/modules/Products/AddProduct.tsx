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

  const [selectedFiles, setSelectedFiles] = useState<File[][]>([[]]);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const values = [...products];
    const { name, value } = event.target;

    if (name === "images" || name === "sizes") {
      values[index][name as "images" | "sizes"] = value.split(",");
    } else if (name === "price" || name === "stock") {
      values[index][name as "price" | "stock"] =
        value === "" ? 0 : parseFloat(value);
    } else if (name === "available") {
      values[index][name as "available"] = value === "true";
    } else {
      values[index][name as "name" | "category"] = value;
    }
    setProducts(values);
  };

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles[index] = fileArray;
      setSelectedFiles(newSelectedFiles);
    }
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
    setSelectedFiles([...selectedFiles, []]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Upload images first
      const imageUrlsPromises = selectedFiles.map(async (files) => {
        const uploadPromises = files.map(async (file) => {
          const base64 = await convertFileToBase64(file);
          const response = await axios.post(
            "https://ncwop1k0f6.execute-api.us-east-1.amazonaws.com/dev/image",
            {
              files: [
                {
                  name: file.name,
                  content: base64,
                  extension: file.name.split(".").pop(),
                },
              ],
            }
          );
          if (response.data && response.data.body) {
            const body = JSON.parse(response.data.body);
            if (body.image_urls && body.image_urls.length > 0) {
              return body.image_urls[0];
            } else {
              throw new Error("Image upload failed, no image URLs returned");
            }
          } else {
            throw new Error("Invalid response from the Lambda function");
          }
        });
        return Promise.all(uploadPromises);
      });

      const imageUrls = await Promise.all(imageUrlsPromises);

      // Attach the image URLs to products
      const updatedProducts = products.map((product, index) => ({
        ...product,
        images: imageUrls[index],
      }));

      // Post the updated products to the backend
      await axios.post(
        "BackendLoadBalancer-2130855055.us-east-1.elb.amazonaws.com/product/add-new-product",
        updatedProducts
      );
      toast.success("Products added successfully");
    } catch (error) {
      console.error("Error adding products:", error);
      toast.error("Failed to add products");
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
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
                value={isNaN(product.price) ? "" : product.price}
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
                value={isNaN(product.stock) ? "" : product.stock}
                onChange={(event) => handleChange(index, event)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Images</label>
              <input
                type="file"
                name="images"
                onChange={(event) => handleFileChange(index, event)}
                className="w-full p-2 border rounded"
                multiple
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
