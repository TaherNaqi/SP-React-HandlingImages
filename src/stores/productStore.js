import { makeAutoObservable } from "mobx";
import instance from "./instance";

class ProductStore {
  constructor() {
    makeAutoObservable(this);
    // this will turn our class into a mobx store and all components can observe the changes that happen in the store
  }
  products = [];

  createProduct = async (newProduct) => {
    try {
      const formData = new FormData();
      for (const key in newProduct) formData.append(key, newProduct[key]);
      const response = await instance.post("/products", formData);
      this.products.push(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: productStore.js ~ line 16 ~ ProductStore ~ createProduct= ~ error",
        error
      );
    }
  };

  fetchProducts = async () => {
    try {
      const response = await instance.get("/products");
      this.products = response.data;
    } catch (error) {
      console.log("ProductStore -> fetchProducts -> error", error);
    }
  };

  updateProduct = async (updatedProduct, productId) => {
    try {
      const formData = new FormData();
      for (const key in updatedProduct)
        formData.append(key, updatedProduct[key]);
      const res = await instance.put(`/products/${productId}`, formData);
      this.products = this.products.map((e) =>
        e.id == res.data.id ? (e = res.data) : e
      );
    } catch (error) {
      console.log("ProductStore -> updateProduct -> error", error);
    }
  };

  deleteProduct = async (productId) => {
    try {
      await instance.delete(`/products/${productId}`);
      this.products = this.products.filter(
        (product) => product._id !== productId
      );
    } catch (error) {
      console.log("ProductStore -> deleteProduct -> error", error);
    }
  };
}

const productStore = new ProductStore();
productStore.fetchProducts();
// It will only call this function when the app first starts

export default productStore;

// axios.METHOD(URL, BODY)

// GET: Fetching Data
// axios.get("http://localhost:8000/api/products");
// Return array of products

// POST => It takes a BODY, and is used when we Send Data (Create)
// axios.post("http://localhost:8000/api/products", newObject);
// Returns a new object

// PUT =>  It takes a BODY, and is used to Update Data. We must pass an ID.
// axios.put(`http://localhost:8000/api/products/${ID}`, updatedObject);
// Returns updated object

// DELETE => Delete some data. We must pass an ID.
// axios.delete(`http://localhost:8000/api/products/${ID}`);
// Returns nothing
