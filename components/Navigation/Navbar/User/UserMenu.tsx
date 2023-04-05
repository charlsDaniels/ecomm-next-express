import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CartWidget from "components/Cart/CartWidget";
import { useAuthContext } from "providers/AuthProvider";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const UserMenu = () => {

  const auth = useAuthContext();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{
      display: 'flex',
    }}>
      {auth.isUserAuthenticated() && <CartWidget />}
      
      <Button
        sx={{ color: "#000", p: 0, fontSize: 16 }}
        onClick={auth.isUserAuthenticated() ? auth.logout : auth.openAuthModal}>
        {auth.isUserAuthenticated() ?
          (isDesktop ? 'Salir' : <LogoutIcon titleAccess="Salir" />) :
          (isDesktop ? 'Ingresar' : <LoginIcon titleAccess="Ingresar" />)}
      </Button>
    </Box>
  );
};

export default UserMenu;
