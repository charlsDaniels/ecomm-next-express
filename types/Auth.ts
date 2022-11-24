import { User as FirebaseUser } from "firebase/auth";

export interface AuthStateInterface {
  token: string
  user: FirebaseUser | null
}

export type AuthContextType = {
  authState: AuthStateInterface
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isUserAuthenticated: () => boolean
  openAuthModal: () => void
  closeAuthModal: () => void
};