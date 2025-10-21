import { InputLabel, Select, OutlinedInput, Box, Chip, MenuItem, type SelectChangeEvent, FormControl } from "@mui/material"
import type { Board, User } from "../../types";
import userService from '../../api/registration'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../Context/UserContext";

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

const ShareUsersDropdown = ({board, selectedUsers, setSelectedUsers}: {board: Board | undefined, selectedUsers: string[], setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>}) => {
  const [users, setUsers] = useState<User[]>([])
  const [selectableUsers, setSelectableUsers] = useState<User[]>([]);
  const user = useContext(UserContext);
  //const [selectedUsers, setSelectedUsers] = useState<string []>([])

  useEffect(() => {
    getUsers();
  }, [board])
  
  const getUsers = async () => {
    const users: User[] = await userService.getUsers()
    setUsers(users);
    
    if(!board) {
      const availableUsers: User[] = users.filter(u =>  u.id !== user?.id)
      setSelectableUsers(availableUsers)
      return
    }
    const availableUsers: User[] = users.filter(u =>  u.id !== board.owner)
    setSelectableUsers(availableUsers);
    
    const initialSelectedUsersId = users.map(user => user.id).filter(id => board.sharedWith.includes(id))
    setSelectedUsers(initialSelectedUsersId)

  }

  const handleChange = (event: SelectChangeEvent<typeof selectedUsers>): void => {
    const value = event.target.value
    const users: string[] = typeof value === 'string' ? value.split(',') : value;
    setSelectedUsers(users)
  }  

  return (
    <FormControl fullWidth>
      <InputLabel id='shared-users-label' >Shared Users</InputLabel>
        <Select
          labelId='shared-users-label'
          id='shared-users'
          multiple
          value={selectedUsers}
          input={<OutlinedInput id="select-multiple-chip" label="Shared Users" />}
          onChange={handleChange}
          fullWidth
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
    </FormControl>
  )
}

export default ShareUsersDropdown