export interface Product {
  name: string;
  price: number;
  category: string;
  available: boolean;
  stock: number;
  images: string[];
  sizes: string[];
}

export interface PurchaseProduct {
  username: string;
  productname: string;
  amount: number;
}
