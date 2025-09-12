import { useState } from "react";
import { useColumns } from "../features/columns/hooks";
import { useModal } from "./Modal";


const ListForm = () => {
  const [name, setName] = useState('');
  const { closeModal } = useModal();
  const { createColumn } = useColumns();

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newColumn = {
      name,
      taskIds: []
    }
    createColumn.mutate(newColumn);
    setName('');
    closeModal();
  }


  return (
    <div className='add-task-form'>
      <form onSubmit={onSubmit}>
        <div className="inputLabel">Add List</div>
        <div className='input-group'>
          <span className='inputLabel'>List Name</span>
          <input 
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