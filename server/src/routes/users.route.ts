import { Router, Response, Request } from "express";
import { NewUser, User } from "../../types";
import UserService from "../services/users.service";

const router = Router();

router.get('/', async (req: Request, res: Response<User[]>) => {
  res.json(await UserService.getAll());
});

router.post('/', async (req: Request<any, any, NewUser>, res: Response<User>) => {
  const newUser: User = await UserService.createUser(req.body);
  res.json(newUser);
});

export default router