import { Box, Tabs, Tab, IconButton } from "@mui/material";
import { useContext } from "react";
import type { Board } from "../types";
import { UserContext } from "./Context/UserContext";
import AddIcon from '@mui/icons-material/Add';

import { useModal } from "./Context/ModalContext";

const BoardTabs = ({activeBoard, boards, handleBoardChange}: {
  activeBoard: Board | null, 
  boards: Board[], 
  handleBoardChange: (event: React.SyntheticEvent, board: Board) => Promise<void>,
}) => {

  const user = useContext(UserContext);
  const { openModal } = useModal();
  
  if(!user) return;


  const handleOpenNewBoardModal = () => {
    openModal({type: 'ADD_BOARD'});
  }
  return (
    <> 
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs  
          onChange={handleBoardChange} 
          value={activeBoard} 
          variant="scrollable">
          boards ? {boards.map(board => <Tab key={board.id} label={board.title} id={board.id} value={board} />)} : null
          <IconButton onClick={handleOpenNewBoardModal} edge="start"><AddIcon/></IconButton>

        </Tabs>
      </Box>
    </>
      
  )
}

export default BoardTabs