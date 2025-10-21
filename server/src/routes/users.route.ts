import { Router, Response, Request } from "express";
import { NewUser, UserType } from "../../types";
import UserService from "../services/users.service";

const router = Router();

router.get('/', async (req: Request, res: Response<UserType[]>) => {
  res.json(await UserService.getAll());
});

router.post('/', async (req: Request<any, any, NewUser>, res: Response<UserType>) => {
  const newUser = await UserService.createUser(req.body) as UserType;
  res.json(newUser)
})


export default router