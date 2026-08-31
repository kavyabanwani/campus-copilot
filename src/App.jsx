import { useState } from 'react'
import AuthScreen from './components/Auth/AuthScreen'
import ChatWorkspace from './components/Chat/ChatWorkspace'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  function handleAuthenticated(user) {
    setCurrentUser(user)
    setIsLoggedIn(true)
  }

  function handleLogout() {
    setCurrentUser(null)
    setIsLoggedIn(false)
  }

  if (!isLoggedIn || !currentUser) {
    return <AuthScreen onAuthenticated={handleAuthenticated} />
  }

  return <ChatWorkspace currentUser={currentUser} onLogout={handleLogout} />
}
