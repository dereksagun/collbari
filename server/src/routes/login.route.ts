import { Router, Request, Response } from "express";
import { LoginInformation, UserNonSensitive } from "../../types";
import { users } from "../../data/users";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = Router();

interface TokenResponse {
  user: UserNonSensitive;
  token: string;
}

router.post('/', async (req: Request<any, any, LoginInformation>, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);

  if(!user ) return res.status(400).json({ error: "Invalid credentials" });

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if(!isValid) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({id: user.id}, "secret-key", {expiresIn: '10m'});

  res.json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    },
    token
  })

})

export default router