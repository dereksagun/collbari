import './App.css'
import './ui/AddTask.css'
import Header from './components/Header'
import KanbanBoard from './components/Board'
import { useState } from 'react'
import loginService from './api/login'
import type { UserNonSensitive } from './types'
import boardService from './api/boards'


const LoginForm = ({setEmail, setPassword, handleLogin} : {setEmail: React.Dispatch<string>, setPassword: React.Dispatch<string>, handleLogin:any}) => {

  return (
    <div>
      <form onSubmit={handleLogin}>
        email
        <input 
          className='input-textbox'
          onChange={(event) => setEmail(event.target.value)}
        />
        <br/>
        password
        <input 
          className='input-textbox'
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type='submit'>login</button>
      </form>
      
    </div>
  )
}

const RegistrationForm = () => {

}

const App = () => {
  const [user, setUser] = useState<UserNonSensitive | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log({email, password});
      const user = await loginService.login({email, password})
      console.log('success login');
      console.log('user = ', user)
      setUser(user.user);
      boardService.setToken(user.token);
    } catch (e) {
      console.log('error login', e);
    }
  }

  const handleLogout = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setUser(null);
    boardService.setToken('');
  }

  return (
    <>
      <Header />
        {user 
          ? 
            <>
            <button onClick={handleLogout}>logout</button> 
            <KanbanBoard user={user}/>
            </>
          : <>
              <LoginForm 
                setEmail={setEmail} 
                setPassword={setPassword}
                handleLogin={handleLogin}
              />
          </>
        }
    </>
  )
}

export default App
