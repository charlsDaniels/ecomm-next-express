import React, { useState } from "react";
import { useAuthContext } from "providers/AuthProvider";
import CustomModal from "components/UI/CustomModal";
import Login from "./LoginForm";
import Register from "./RegisterForm";

const AuthModal: React.FC = () => {
  enum Modes {
    LOGIN,
    REGISTER,
  }

  const [mode, setMode] = useState(Modes.LOGIN);

  const { closeAuthModal } = useAuthContext();

  const toggleMode = () => {
    setMode(mode === Modes.LOGIN ? Modes.REGISTER : Modes.LOGIN);
  };

  return (
    <CustomModal onClose={closeAuthModal}>
      {mode === Modes.LOGIN && <Login onChangeMode={toggleMode} />}
      {mode === Modes.REGISTER && <Register onChangeMode={toggleMode} />}
    </CustomModal>
  );
};

export default AuthModal;
