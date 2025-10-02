import { Card } from "@mui/material";
import { forwardRef } from "react";

interface TaskCardProps {
  children?: React.ReactNode
  style?: React.CSSProperties;
}

const TaskCard =forwardRef<HTMLDivElement, TaskCardProps>(({style, children, ...props}, ref) => {


  return (
    <>
      <Card variant="outlined" className='task-card' style={style} ref={ref} {...props}>       
        <h5>{children}</h5> 
      </Card>
    </>
  )
})

export default TaskCard