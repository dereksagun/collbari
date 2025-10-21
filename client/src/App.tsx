import './App.css'
import './ui/AddTask.css'
import Header from './components/Header'
import KanbanBoard from './components/Board'
import { useState } from 'react'
import type { UserNonSensitive } from './types'
import boardService from './api/boards'
import { UserContext } from './components/Context/UserContext'
import LoginPage from './components/LoginPage'
import { useQueryClient } from '@tanstack/react-query'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState<UserNonSensitive | null>(null);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error'> ('error');

  const handleLogout = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setUser(null);
    boardService.setToken('');
    queryClient.clear();
  }

  return (
    <UserContext.Provider value={user}>
      <div className='page'>
        <Notification open={open} notification={notification} setOpen={setOpen} severity={severity}/>
        {user ? 
          <>
            <Header handleLogout={handleLogout}/>
            <KanbanBoard/>
          </>
          : <LoginPage setUser={setUser} setNotification={setNotification} setSeverity={setSeverity} setOpen={setOpen}/>
        }
        
      </div>
    </UserContext.Provider>
  )
}

export default App
