import { useEffect, useState } from 'react';
import type { Board, User } from '../../types';
import { Button, Typography } from '@mui/material';
import { useBoards } from '../../hooks/useBoards';
import { useModal } from '../Context/ModalContext';
import ShareUsersDropdown from './ShareUsersDropdown';
import userService from '../../api/registration'


const ShareWithForm = ({board}: {board: Board}) => {
  
  const [selectedUsers, setSelectedUsers] = useState<string []>([])
  const { updateBoard } = useBoards();
  const { closeModal } = useModal();
  const [owner, setOwner] = useState<User | null>(null)
  
  useEffect(() => {
    getOwner();
  }, [])

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();

    const newBoard: Board = {
      ...board,
      sharedWith: selectedUsers
    }
    updateBoard.mutate(newBoard);
    closeModal();
  }

  const getOwner = async () => {
    const users = await userService.getUsers();
    let user = users.find(user => user.id === board.owner) || null;
    setOwner(user)
  }

  return (
    <>
    <div className='modal' >
      <form onSubmit={handleSubmit}>
        <Typography>{board.title}</Typography>
        <Typography>owner: {owner?.username}</Typography>
        <br></br>
        <ShareUsersDropdown board={board} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
        <br></br>
        <br></br>
        <span><Button onClick={closeModal} variant="outlined">Cancel</Button> <Button type="submit" variant="contained">Share</Button></span>
        
      </form>
        
      </div>
      
    </>
  )
}



export default ShareWithForm