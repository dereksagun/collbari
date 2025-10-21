import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import type { Board, NewColumn } from "../../types";
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import { useColumns } from "../../hooks/useColumns";

const AddColumnButton = ({board} : {board: Board}) => {
  const [ textboxOpen, setTextboxOpen ] = useState(false);
  const [ title, setTitle ] = useState('');
  const { createColumn } = useColumns();

  useEffect(() => {
    handleCloseTextbox();
  },[board])

  const textBoxHidden = {
    display: textboxOpen ? '' : 'none' 
  }
  const addColumnHidden = {
    display: textboxOpen ? 'none' : ''
  }

  const handleCloseTextbox = () => {
    setTextboxOpen(false);
    setTitle('');
  }

  const handleSubmitNewColumn = () => {
    const column: NewColumn = {
      name: title,
      taskIds: []
    };
    createColumn.mutate({column, board})
    setTextboxOpen(false);
    setTitle('');
  }


  return (
    <div>
        <Button onClick={() => setTextboxOpen(true)} variant="text" sx={{ textAlign: 'left', justifyContent: 'flex-start', width: '300px', 'backgroundColor': '#ffffff39', ...addColumnHidden}}>+ Another List</Button>
          <TextField hiddenLabel
            id="filled-hidden-label-small"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            variant="filled"
            size="small"
            margin="dense"
            sx={{...textBoxHidden, marginTop: '0px', width: '300px'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleCloseTextbox} edge="start">
                    <ClearIcon/>
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSubmitNewColumn} edge="end">
                    <SendIcon/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
            />
          
    </div>
    
  )
}

export default AddColumnButton