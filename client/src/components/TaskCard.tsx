import { forwardRef } from "react";

interface TaskCardProps {
  children?: React.ReactNode
  style?: React.CSSProperties;
}

const TaskCard =forwardRef<HTMLDivElement, TaskCardProps>(({style, children, ...props}, ref) => {

  
  return (
    <div className='task-card' style={style} ref={ref} {...props}>
      <h5>{children}</h5>
    </div>
  )
})

export default TaskCard