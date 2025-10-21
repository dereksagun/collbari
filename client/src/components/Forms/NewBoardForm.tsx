import { Button, TextField } from "@mui/material"
import { useContext, useState } from "react"
import ShareUsersDropdown from "./ShareUsersDropdown"
import { UserContext } from "../Context/UserContext"
import { useModal } from "../Context/ModalContext"
import type { NewBoard } from "../../types"
import { useBoards } from "../../hooks/useBoards"

const NewBoardForm = () => {
  const [title, setTitle] = useState<string>('')
  const [selectedUsers, setSelectableUsers] = useState<string[]>([])
  const user = useContext(UserContext);
  const {closeModal} = useModal();
  const { createBoard } = useBoards();

  const handleCreateBoard = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if(!user) return
    const newBoard: NewBoard = {
      columnIds: [],
      owner: user.id,
      sharedWith: [...selectedUsers],
      title: title
    }

    createBoard.mutate(newBoard);
    closeModal();
  }

  return (
    <div className="modal shadow-xl border border-gray-100 w-[400px] p-6 space-y-5" >
      <form onSubmit={handleCreateBoard}>
        <div className="space-y-4">
          <div className="text-lg font-semibold text-gray-800">Create New Board</div>
          <TextField required fullWidth label="Title" value={title} onChange={(event) => setTitle(event.target.value)}/>
          <br></br>
          <br></br>
          <ShareUsersDropdown board={undefined} selectedUsers={selectedUsers} setSelectedUsers={setSelectableUsers} />
          <br></br>
        </div>
        <br></br>
        <span><Button onClick={closeModal} variant="outlined">Cancel</Button> <Button type="submit" variant="contained">Create</Button></span>
        <br></br>
      </form>
      

    </div>
  )
}

export default NewBoardForm