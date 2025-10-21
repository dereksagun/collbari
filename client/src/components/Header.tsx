import { Box, Button } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../assets/test3.png'
import Icon from '../assets/Icon.png'

const Header = ({handleLogout}: {handleLogout: (event: React.SyntheticEvent) => void}) => {
  return (
    <div className="kanban-header">
      <Box sx={{display: "flex"}}><img src={Icon} alt="icon" className="h-6"/><img src={Logo} alt="Logo" className="h-6"/></Box>
      <Box sx={{flex: 1, textAlign:'right', color:'white'}}>
        <Button onClick={handleLogout} sx={{color: 'white'}}><LogoutIcon/>Logout</Button>
        </Box>
    </div>
  )

}

export default Header