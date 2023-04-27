import AuthModal from "components/Forms/Auth/AuthModal";
import { useRouter } from 'next/router';
import { createContext, useContext, useState } from "react";
import { FieldValues } from "react-hook-form";
import { axios } from '../services/axios';
import { AuthContextType, AuthStateInterface } from '../types/Auth';

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

  const login = async (form: FieldValues) => {

    const { data } = await axios.post('/auth/login', form)
    const { token, user } = data
    
    setAuthState(data)
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    axios.interceptors.request.use(
      config => {
        if (token) {
          config.headers['Authorization'] = token
        }
        return config
      }
    )

    closeAuthModal()
  }

  const logout = () => {
    setAuthState({
      token: "",
      user: null
    })
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const isUserAuthenticated = () => {
    return authState.user !== null;
  };

  const openAuthModal = () => setOpenModal(true);

  const closeAuthModal = () => setOpenModal(false);

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
