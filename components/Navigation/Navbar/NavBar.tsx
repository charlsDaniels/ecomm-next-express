import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../../services/firebase/querys";
import { Category } from "../../../types/Category";
import Brand from "../../Brand/Logo";
import AsideMenu from "./Aside/AsideMenu";
import UserMenu from "./User/UserMenu";

const Navbar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchData = async () => {
    const snapshot = await fetchCategories();
    const categories = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setCategories(categories);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <AsideMenu categories={categories} />
          <Brand />
          <UserMenu />
        </Toolbar>
    </AppBar >
  );
};

export default Navbar;
