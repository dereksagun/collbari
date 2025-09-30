import { Router, Request, Response } from "express";
import BoardsService from "../services/boards.service";
import { Board, NewBoard } from "../../types";
import jwt from "jsonwebtoken"

const router = Router();

router.get('/', async (req: Request, res: Response<Board[]>) => {
  //res.json(await BoardsService.getAll());
  const token = req.headers.authorization?.split(" ")[1]

  if(!token) return res.status(401)

  try {
    const decoded = jwt.verify(token, 'secret-key') as {
      id: string,
      email: string
    }
    res.json(await BoardsService.getBoards(decoded.id));
  } catch (e) {
    return res.status(401)
  }

});

router.post('/', async (req: Request<any, any, NewBoard>, res: Response<Board>) => {
  const newBoard: Board = await BoardsService.createBoard(req.body);
  res.json(newBoard);
});

router.put('/:id', async (req: Request<any, any, Board>, res: Response<Board>) => {
  const updatedBoard: Board = await BoardsService.updateBoard(req.body);
  res.json(updatedBoard);
})


export default router;