import type { Task } from "../types"

interface taskBoxProp {
  task: Task
}

const TaskCard = ({task}: taskBoxProp) => {
  return (
    <div className='task-card'>
      <h5>{task.title}</h5>
    </div>
  )
}

export default TaskCard