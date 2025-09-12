import { Router, Response, Request } from "express";
import ColumnService from '../services/columns.service'
import { Column, NewColumn } from "../../types";

const router = Router();

router.get('/', async (req: Request, res: Response<Column[]>) => {
  res.json(await ColumnService.getAll());
});

router.post('/', async (req: Request<any, any, NewColumn>, res: Response<Column>) => {
  const newColumn = await ColumnService.createColumn(req.body);
  res.json(newColumn);
});

router.put('/:id', async (req: Request<any, any, Column>, res: Response<Column>) => {
  const updatedColumn = await ColumnService.updateColumn(req.params.id, req.body);
  res.json(updatedColumn);
})

export default router;