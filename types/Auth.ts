export interface LoginForm {
  email: string
  password: string
};

export interface RegisterForm {
  username: string
  email: string
  password: string
  password_confirm: string
};

export interface AuthUser {
  uid: string
  username: string
  email: string
  role: string
  active: boolean
  google: boolean
}

export interface AuthStateInterface {
  token: string
  user: AuthUser | null
}

export type AuthContextType = {
  authState: AuthStateInterface
  login: (form: LoginForm) => Promise<void>
  logout: () => void
  isUserAuthenticated: () => boolean
  openAuthModal: () => void
  closeAuthModal: () => void
};