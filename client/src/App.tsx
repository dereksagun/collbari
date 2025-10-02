import './App.css'
import './ui/AddTask.css'
import Header from './components/Header'
import KanbanBoard from './components/Board'
import { useState } from 'react'
import loginService from './api/login'
import type { User, UserNonSensitive } from './types'
import boardService from './api/boards'
import registrationService from './api/registration'


const LoginForm = ({setEmail, setPassword, handleLogin} : {setEmail: React.Dispatch<string>, setPassword: React.Dispatch<string>, handleLogin:any}) => {

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
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
        <br></br>
        <button type='submit' className='acceptButton'>login</button>
      </form>
      
    </div>
  )
}

const RegistrationForm = ({
  setRegistrationEmail,
  setRegistrationUsername,
  setRegistrationPassword,
  handleRegistration
  }: {
    setRegistrationEmail : React.Dispatch<string>,
    setRegistrationUsername : React.Dispatch<string>,
    setRegistrationPassword :React.Dispatch<string>,
    handleRegistration: any
  }) => {
  return (
    <> 
      <br></br>
      <form onSubmit={handleRegistration}>
        <h3>Registration</h3>
        email
        <input
          className='input-textbox'
          onChange={(event) => setRegistrationEmail(event.target.value)}
        />
        <br></br>
        username
        <input
          className='input-textbox'
          onChange={(event) => setRegistrationUsername(event.target.value)}
        />
        <br></br>
        password
        <input
          className='input-textbox'
          onChange={(event) => setRegistrationPassword(event.target.value)}
        />
        <br></br>
        <button type='submit' className='acceptButton'>register</button>
      </form>
    </>
  )
}

const App = () => {
  const [user, setUser] = useState<UserNonSensitive | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState<string>('');
  const [registrationUsername, setRegistrationUsername] = useState<string>('');
  const [registrationPassword, setRegistrationPassword] = useState<string>('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const user = await loginService.login({email, password})
      console.log('success login');
      console.log('user = ', user)
      setUser(user.user);
      boardService.setToken(user.token);
    } catch (e) {
      console.log('error login', e);
    }
  }
  const handleRegistration = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const registeredUser: User = await registrationService.registerUser({
        email: registrationEmail,
        username: registrationUsername,
        password: registrationPassword
      })

      if(!registeredUser) throw new Error('Issue Registering User');

      const user = await loginService.login({email: registrationEmail, password: registrationPassword})
      console.log('success login');
      console.log('user = ', user)
      setUser(user.user);
      boardService.setToken(user.token);

    } catch (e) {
      console.log('error registration', e);
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
              <RegistrationForm 
               setRegistrationEmail={setRegistrationEmail} 
               setRegistrationUsername={setRegistrationUsername}
               setRegistrationPassword={setRegistrationPassword}
               handleRegistration={handleRegistration}/>
          </>
        }
    </>
  )
}

export default App
