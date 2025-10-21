import React, { useState } from 'react'
import collabri from '../assets/test2.png'
import loginService from '../api/login'
import type { User, UserNonSensitive } from '../types'
import boardService from '../api/boards'
import registrationService from '../api/registration'


const LoginDetails = ({setLoginPage, setUser, setNotification, setOpen, setSeverity}: {
  setLoginPage: React.Dispatch<React.SetStateAction<boolean>>, 
  setUser: React.Dispatch<React.SetStateAction<UserNonSensitive | null>>,
  setNotification: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSeverity: React.Dispatch<React.SetStateAction<'success' | 'error'>>
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const user = await loginService.login({email, password})
      //console.log('success login' , user);
      setUser(user.user);
      boardService.setToken(user.token);
      setNotification('Successfully Login!')
      setSeverity('success');
      setOpen(true);
    } catch (e) {
      //console.log('error login', e);
      setNotification('Invalid Credentials!')
      setSeverity('error');
      setOpen(true);
    }
  }

  return (
    <>
    
    <h1 className="text-2xl font-semibold mb-4">Login</h1>
    <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label  className="block text-gray-600">Email</label>
            <input required type="text" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" 
            value={email} onChange={(event) => setEmail(event.target.value)}/>
          </div>
          
          <div className="mb-4">
            <label  className="block text-gray-600">Password</label>
            <input required type="password" id="loginPassword" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off"
            value={password} onChange={(event) => setPassword(event.target.value)}/>
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
          <div className="mt-6 text-blue-500 text-center">
            <a onClick={() => setLoginPage(false)} href="#" className="hover:underline">Sign up Here</a>
          </div>
        </form>
    </>
    
  )
}

const RegistrationDetails = ({setLoginPage, setUser, setNotification, setOpen, setSeverity}: {
  setLoginPage: React.Dispatch<React.SetStateAction<boolean>>, 
  setUser: React.Dispatch<React.SetStateAction<UserNonSensitive | null>>,
  setNotification: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSeverity: React.Dispatch<React.SetStateAction<'success' | 'error'>>
}) => {
  const [registrationEmail, setRegistrationEmail] = useState<string>('');
  const [registrationUsername, setRegistrationUsername] = useState<string>('');
  const [registrationPassword, setRegistrationPassword] = useState<string>('');

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
      //console.log('success login' , user);
      setUser(user.user);
      boardService.setToken(user.token);
      setNotification('Successfully Registered User!')
      setSeverity('success');
      setOpen(true);

    } catch (e) {
      //console.log('error registration', e);
      setNotification('Error creating account. Please try again.')
      setSeverity('error');
      setOpen(true);
    }
  }
  return (
    <>
    <h1 className="text-2xl font-semibold mb-4">Registration</h1>
    <form onSubmit={handleRegistration}>
          <div className="mb-4">
            <label  className="block text-gray-600">Username</label>
            <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" 
            value={registrationUsername} onChange={(event) => setRegistrationUsername(event.target.value)}/>
          </div>

          <div className="mb-4">
            <label  className="block text-gray-600">Email</label>
            <input type="text" id="email" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" 
            value={registrationEmail} onChange={(event) => setRegistrationEmail(event.target.value)}/>
          </div>
          
          <div className="mb-4">
            <label  className="block text-gray-600">Password</label>
            <input type="password" id="registrationPassword" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" 
            value={registrationPassword} onChange={(event) => setRegistrationPassword(event.target.value)}/>
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Create Account</button>

          <div className="mt-6 text-blue-500 text-center">
          <a onClick={() => setLoginPage(true)} href="#" className="hover:underline">Go Back</a>
        </div>
    </form>
    </>
  )
}


const LoginPage = ({setUser, setNotification, setOpen, setSeverity
}: {
  setUser: React.Dispatch<React.SetStateAction<UserNonSensitive | null>>,
  setNotification: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSeverity: React.Dispatch<React.SetStateAction<'success' | 'error'>>}) => {
  const [loginPage, setLoginPage] = useState(true);
  
  return (
    <div>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <img src={collabri} alt="Placeholder Image" className="object-cover w-full h-full" />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        {loginPage 
          ? <LoginDetails setLoginPage={setLoginPage} setUser={setUser} setNotification={setNotification} setOpen={setOpen} setSeverity={setSeverity}/> 
          : <RegistrationDetails setLoginPage={setLoginPage} setUser={setUser} setNotification={setNotification} setOpen={setOpen} setSeverity={setSeverity}/>}
      </div>      
      </div>

    </div>
  )
}

export default LoginPage