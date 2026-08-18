import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

interface User {
  username: string
  name: string
  email: string
  role: string
}

interface AuthContextValue {
  user: User | null
  password: string
  login: (username: string, password: string) => boolean
  logout: () => void
  changePassword: (currentPassword: string, newPassword: string) => boolean
  isLoggedIn: boolean
}

const DEFAULT_USER: User = {
  username: 'admin',
  name: 'Admin',
  email: 'admin@mydesk.dev',
  role: 'Administrator',
}

const DEFAULT_PASSWORD = 'admin@123'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  // Store the current password in state so changes persist within the session
  const [password, setPassword] = useState(DEFAULT_PASSWORD)

  const login = useCallback(
    (username: string, enteredPassword: string): boolean => {
      if (
        username.trim().toLowerCase() === DEFAULT_USER.username &&
        enteredPassword === password
      ) {
        setUser(DEFAULT_USER)
        return true
      }
      return false
    },
    [password]
  )

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const changePassword = useCallback(
    (currentPassword: string, newPassword: string): boolean => {
      if (currentPassword !== password) return false
      setPassword(newPassword)
      return true
    },
    [password]
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        password,
        login,
        logout,
        changePassword,
        isLoggedIn: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
