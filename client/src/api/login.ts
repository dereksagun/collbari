import axios from "axios";
import type { loginPayload } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || ''
const baseUrl = `${API_BASE}/api/auth/login`

const login = async (loginCredentials: {email: string, password: string}): Promise<loginPayload> => {
  const { data } = await axios.post<loginPayload>(baseUrl, loginCredentials)
  return data
}

export default {
  login
}