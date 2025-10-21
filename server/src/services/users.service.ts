//import { users } from '../../data/users'
import { NewUser, UserNonSensitive, UserType } from "../../types";
import { v4 as uuidv4 } from 'uuid'
import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import User from '../models/user'

const getAll = async (): Promise<any> => {
  const users = await User.find({});
  return users;
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

const createUser = async (obj : {email: string, username: string, password: string}): Promise<any> => {
  try{
    const { email, username, password } = obj;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({email, username, passwordHash});
    const addedUser = await newUser.save();

    if (!addedUser) throw new Error('Error creating user.');

    const userToReturn = addedUser.toJSON(); // <-- This will trigger the transform

    return userToReturn;

  } catch (error: unknown) {
    if(error instanceof Error){
      console.error('Error creating user user:', error.message);
    }
    throw error;
  }
  
}

const getUserByEmail = async (email: string): Promise<any> => {
  try {
    const user = await User.findOne({email})
    if(!user) throw new Error ("User does not exist.")
    return user.toJSON();
  } catch (error: unknown) {
    if(error instanceof Error){
      console.error('Error finding user:', error.message);
    }
    throw error;
  }
}

export default {
  getAll,
  createUser,
  getUserByEmail
}