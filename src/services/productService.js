import { apiRequest } from "./apiClient";

export async function getProducts() {
  const data = await apiRequest("/products?limit=12");

  return data.products;
}

export async function getProductById(id) {
  if (!Number.isInteger(Number(id)) || Number(id) < 1) {
    throw new Error("A valid product ID is required.");
  }

  return apiRequest(`/products/${Number(id)}`);
}