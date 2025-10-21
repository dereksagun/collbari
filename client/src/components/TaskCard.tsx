import { Box, Paper } from "@mui/material";
import { forwardRef } from "react";

interface TaskCardProps {
  children?: React.ReactNode
  style?: React.CSSProperties;
}

const TaskCard =forwardRef<HTMLDivElement, TaskCardProps>(({style, children, ...props}, ref) => {
  return (
    <>
      <Paper 
      style={style} 
      ref={ref} {...props}
        elevation={2} 
        sx={{ p: 1, mb: 1, '&:hover': { boxShadow: 3 }, width: '100%', 
         }}>
        <Box sx={{display: 'flex', alignItems: 'center', gap: '8px', }}>{children}</Box> 
      </Paper>
    </>
  )
})

export default TaskCard