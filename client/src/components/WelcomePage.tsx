import { Button } from "@mui/material";
import { useModal } from "./Context/ModalContext";

const WelcomePage = () => {
  const { openModal } = useModal();

  const handleOpenNewBoardModal = () => {
    console.log('test');
    openModal({type: 'ADD_BOARD'});
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
      <h2 className="text-xl font-semibold mb-2">Welcome to Collabri!</h2>
      <p className="mb-4">You don’t have any boards yet. Create your first one to get started.</p>
      <Button 
      variant="outlined"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
        onClick={handleOpenNewBoardModal}
      >
        + Create Board
      </Button>
    </div>
    </>
  )
}

export default WelcomePage