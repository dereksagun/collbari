import { Avatar, Box, IconButton } from "@mui/material"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import type { Board, User } from "../types";
import { useModal } from "./Context/ModalContext";
import userService from "../api/registration"
import { useEffect, useState } from "react";


const ShareUsersColumn =  ({board} : {board: Board | null}) => {
  const {openModal} = useModal();
  const [users, setUsers] = useState<User[]>([]);
  const [sharedUsers, setSharedUsers] = useState<User[]>([]);
  

  useEffect(() => {
    if(!board) return;
    setSharedUsers(board.sharedWith.map(sid => users.find(user => user.id === sid)).filter(item => item !== undefined))
  }, [users, board])

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await userService.getUsers());
    }
    getUsers();
  }, [])
  
  const handleOpenShareForm = (): void => {
    if(!board) return 
    openModal({type: "SHARE_BOARD", props: {board}})
  }

  if(!board) return;

  return (
          <Box sx={{width: 64,
            bgcolor: '#f8f9fc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            borderRight: '1px solid #e0e0e0',
            padding: '8px'
            
            }}>
              {sharedUsers.map(user => <Avatar key={user.id}>{user.username[0]}</Avatar>)}
              <IconButton onClick={handleOpenShareForm}><GroupAddIcon /></IconButton>
            </Box>
  )
}

export default ShareUsersColumn