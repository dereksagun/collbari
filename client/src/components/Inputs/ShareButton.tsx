import Button from "@mui/material/Button";
import { useModal } from "../Context/ModalContext";
import ShareIcon from '@mui/icons-material/Share';
import type { Board } from "../../types";


const ShareButton = ({board}:{board: Board}) => {
  const {openModal} = useModal();

  const handleOpenShareForm = (): void => {
    openModal({type: "SHARE_BOARD", props: {board}})
  }
  return (
    <>
      <Button onClick={handleOpenShareForm} variant="contained"><ShareIcon /> Share</Button>
    </>
  )

}

export default ShareButton