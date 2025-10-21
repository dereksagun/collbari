import { useState } from "react";
import { useColumns } from "../../hooks/useColumns";
import { useModal } from "../Context/ModalContext";
import type { Board } from "../../types";


const ListForm = ({board}: {board: Board}) => {
  const [name, setName] = useState('');
  const { closeModal } = useModal();
  const { createColumn } = useColumns();
  
  const handleAddColumn = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newColumn = { name, taskIds: [] }
    createColumn.mutate({column: newColumn , board: board}); //need to pass data to this form about the boardId 
    setName('');
    closeModal();
  }


  return (
    <div className='add-task-form modal'>
      <form onSubmit={handleAddColumn}>
        <div className="inputLabel">Add List</div>
        <div className='input-group'>
          <span className='inputLabel'>List Name</span>
          <input 
            required
            className='input-textbox' 
            type='text'
            id='name'
            value={name}
            onChange={(event) => setName(event.target.value)}/>
          <br />
        </div>
        <span><button onClick={closeModal} className="declineButton" type="button">Cancel</button> <button className="acceptButton" type="submit">Submit</button></span>
      </form>
    </div>
  )
}

export default ListForm