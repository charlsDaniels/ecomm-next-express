import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Brand from "components/Brand/Logo";
import SideDrawer from "../SideDrawer/SideDrawer";
import UserMenu from "./User/UserMenu";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 0, md: 2 } }}>
        <SideDrawer />
        <Brand />
        <UserMenu />
      </Toolbar>
    </AppBar >
  );
};

export default Navbar;
