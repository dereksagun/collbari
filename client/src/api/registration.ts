import axios from 'axios'
import type { NewUser, User } from '../types'

const baseUrl = '/api/register'

const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(baseUrl);
  return data

}
const registerUser =  async (obj: NewUser): Promise<User> => {
  const { data } = await axios.post<User>(baseUrl, obj);
  return data
}

export default {
  registerUser,
  getUsers
}
