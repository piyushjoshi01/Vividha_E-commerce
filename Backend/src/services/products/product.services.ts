import { error } from "console";
import { client, dbName } from "../../config/mongoDb";
import { Product } from "../../types/productType";
import { ObjectId } from "mongodb";

class ProductServices {
  constructor() {}

  async addNewProduct(products: Product[]): Promise<string> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<Product>("products");

      console.log("Inserting products:", products);

      const result = await collection.insertMany(products);

      console.log(result);

      if (result.insertedCount === products.length) {
        return "Products added successfully.";
      } else {
        throw new Error("Error adding products");
      }
    } catch (err) {
      console.error("Error adding products:", err);
      throw new Error("Internal server error");
    }
  }

  async getAllProducts() {
    const db = client.db(dbName);
    const collection = db.collection<Product>("products");

    const products = await collection.find().toArray();

    return products;
  }

  async getProductByID(id: string) {
    const db = client.db(dbName);
    const collection = db.collection<Product>("products");

    const objectId = new ObjectId(id);
    const product = await collection.findOne({ _id: objectId });

    if (product) {
      return product;
    } else {
      return "Product Not Found";
    }
  }

  async updateProduct(id: string, product: Product) {
    const db = client.db(dbName);
    const collection = db.collection<Product>("products");

    const objectId = new ObjectId(id);
    console.log("ObjectId:", objectId);
    console.log("Product:", product);
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: product }
    );

    if (result.acknowledged == true && result.modifiedCount > 0) {
      return "Product Updated Successfully";
    } else {
      throw new Error("Error Updating Product");
    }
  }

  async deleteProduct(id: string) {
    const db = client.db(dbName);
    const collection = db.collection<Product>("products");

    const objectId = new ObjectId(id);
    console.log("ObjectId:", objectId);
    try {
      const result = await collection.deleteOne({ _id: objectId });
      if (result.deletedCount === 1) {
        return "Product Deleted Successfully";
      } else {
        throw new Error("Product Not Found");
      }
    } catch (err) {
      console.log(err);
    }
  }
}
export default new ProductServices();
