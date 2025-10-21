import axios from "axios";
import type { loginPayload } from "../types";

const baseUrl = '/api/auth/login'

const login = async (loginCredentials: {email: string, password: string}): Promise<loginPayload> => {
  const { data } = await axios.post<loginPayload>(baseUrl, loginCredentials)
  return data
}

export default {
  login
}