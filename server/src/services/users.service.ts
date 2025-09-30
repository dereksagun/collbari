import { users } from '../../data/users'
import { NewUser, User } from "../../types";
import { v4 as uuidv4 } from 'uuid'
import bcrypt from "bcrypt";

const getAll = async (): Promise<User[]> => {
  return users
}

/*
const createUser = async (obj: NewUser): Promise<User> => {
  const newUser: User = {
    id: uuidv4(),
    ...obj
  }
  users.push(newUser);
  return newUser
}
*/

const createUser = async (obj : {email: string, username: string, password: string}) => {
  const { email, username, password } = obj;
  if(users.find(user => user.email === email)){
    return 
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = {
    id: uuidv4(),
    email,
    username,
    passwordHash
  }

  users.push(newUser);
  return newUser;
}

const getUserByEmail = async (email: string): Promise<User | undefined> => {
  const user = users.find(user => user.email === email)
  return user
}

export default {
  getAll,
  createUser
}