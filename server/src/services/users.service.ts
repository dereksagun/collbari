import { users } from '../../data/users'
import { NewUser, User } from "../../types";
import { v4 as uuidv4 } from 'uuid'

const getAll = async (): Promise<User[]> => {
  return users
}

const createUser = async (obj: NewUser): Promise<User> => {
  const newUser: User = {
    id: uuidv4(),
    ...obj
  }
  users.push(newUser);
  return newUser
  
}

export default {
  getAll,
  createUser
}