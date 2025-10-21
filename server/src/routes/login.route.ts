
import { Router, Request, Response } from "express";
import { LoginInformation, UserNonSensitive } from "../../types";
import { users } from "../../data/users";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import usersService from "../services/users.service";
import config from '../utils/config'


const router = Router();

interface TokenResponse {
  user: UserNonSensitive;
  token: string;
}

router.post('/', async (req: Request<any, any, LoginInformation>, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.getUserByEmail(email);
    if(!user) return res.status(400).json({ error: "User doesnt exist." });

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if(!isValid) return res.status(400).json({ error: "Invalid credentials" });

    if(!config.SECRET) throw new Error ('Environement variable is not set')
    const token = jwt.sign({id: user.id}, config.SECRET, {expiresIn: '10m'});

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    })

  } catch (error) {

    res.status(400).json({ error: error });
  }

})

export default router