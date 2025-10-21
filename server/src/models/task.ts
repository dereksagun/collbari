import mongoose from 'mongoose'
import { Task } from '../../types';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    require: true
  },
}, 
{
  toJSON: {
    transform: (_doc, ret) => ({
      id: ret._id.toString(),
      title: ret.title,
      description: ret.description,
      completed: ret.completed,
    })
  }
}
);



const TaskModel = mongoose.model('Task', taskSchema)

export default TaskModel
