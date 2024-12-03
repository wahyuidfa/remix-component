import axios from "axios";

const API_URL = "http://localhost:3000/users"; // Ganti dengan URL backend NestJS Anda

// Get all users
export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get user by ID
export const getUserById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create user
export const createUser = async (user: string) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

// Update user
export const updateUser = async (id: number, user: string) => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

// Delete user
export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
