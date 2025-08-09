// src/api/axiosClient.js
import axios from "axios";

const baseURL = import.meta?.env?.VITE_API_BASE_URL || "http://localhost:4000";

const axiosClient = axios.create({
	baseURL,
	headers: { "Content-Type": "application/json" },
});

export default axiosClient;
