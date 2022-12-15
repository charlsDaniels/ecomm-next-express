import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../../services/firebase/querys";
import { Category } from "../../../types/Category";
import Brand from "../../Brand/Logo";
import AsideMenu from "./Aside/AsideMenu";
import NavigationItems from "./NavigationItems/NavigationItems";

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
      <Container maxWidth="xl">
        <Toolbar>
          <AsideMenu categories={categories} />

          <Brand />

          <NavigationItems categories={categories} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
