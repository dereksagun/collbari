import { useEffect, useState } from 'react';
import userService from '../api/registration';
import type { Board, User, UserNonSensitive } from '../types';
import { Autocomplete, Box, Button, Chip, InputLabel, MenuItem, OutlinedInput, Select, type SelectChangeEvent } from '@mui/material';
import { useBoards } from '../hooks/useBoards';
import { useModal } from './Modal';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ShareWithForm = ({board}: {board: Board}) => {
  
  const [users, setUsers] = useState<User[]>([]);
  const [selectableUsers, setSelectableUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string []>([])
  const { updateBoard } = useBoards();
  const { closeModal } = useModal();

  useEffect(() => {
    getUsers();
    console.log('test')
  }, [board])
  
  const getUsers = async () => {
    const users: User[] = await userService.getUsers()
    setUsers(users);
    
    const select: User[] = users.filter(u =>  u.id !== board.owner)
    setSelectableUsers(select);
    
    const initialSelectedUsersId = users.map(user => user.id).filter(id => board.sharedWith.includes(id))
    setSelectedUsers(initialSelectedUsersId)

  }
  const owner: User | undefined = users.find(user => user.id === board.owner)

  const handleChange = (event: SelectChangeEvent<typeof selectedUsers>): void => {
    const value = event.target.value
    const users: string[] = typeof value === 'string' ? value.split(',') : value;
    setSelectedUsers(users)
    

  }

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    const newBoard: Board = {
      ...board,
      sharedWith: selectedUsers
    }
    updateBoard.mutate(newBoard);
    closeModal();
  }

  return (
    <>
    <div className='add-task-form modal' >
      <form onSubmit={handleSubmit}>
        <span>owner: {owner?.username}</span>
        <div>
        </div>
        <InputLabel id='demo-select-small-label'>Shared Users</InputLabel>
        <Select
          labelId='demo-select-small-label'
          id='demo-select-small'
          multiple
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          value={selectedUsers}
          onChange={handleChange}
          renderValue={(selected) => {
            return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => { 
                const username = users?.find(u => u.id === value)?.username
                return <Chip key={value} label={username} />
              })}
            </Box>
          )}}
          MenuProps={MenuProps}

        >
          {selectableUsers.map(user => 
            <MenuItem 
              key={user.id} 
              value={user.id}>{user.username}</MenuItem>
          )}
        </Select>
        <br></br>
        <span><Button onClick={closeModal} variant="outlined">Cancel</Button> <Button type="submit" variant="contained">Share</Button></span>
        
        
      </form>
        
      </div>
      
    </>
  )
}

export default ShareWithForm