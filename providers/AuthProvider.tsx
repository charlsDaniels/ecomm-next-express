import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import AuthModal from "../components/Forms/AuthModal";
import { auth } from "../services/firebase/initialize";
import { AuthContextType, AuthStateInterface } from "../types/Auth";

const authContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthStateInterface>({
    token: "",
    user: null
  });

  const [openModal, setOpenModal] = useState(false);

  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }

  const logout = () => {
    signOut(auth);
    router.push("/");
  };

  const isUserAuthenticated = () => {
    return authState.user !== null;
  };

  const openAuthModal = () => setOpenModal(true);

  const closeAuthModal = () => setOpenModal(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAuthState({ ...authState, user: currentUser });
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        authState,
        login,
        logout,
        isUserAuthenticated,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {openModal && <AuthModal />}
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
