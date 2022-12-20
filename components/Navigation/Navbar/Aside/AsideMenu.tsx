import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {useState, useEffect} from 'react';
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { Category } from "../../../../types/Category";
import Link from "next/link";
import { fetchCategories } from "../../../../services/firebase/querys";

const AsideMenu: React.FC = () => {

  const [categories, setCategories] = useState<Category[]>([]);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
    <Box>
      <IconButton
        size="large"
        aria-label="categorias"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.description}`}>
            <MenuItem
              key={category.id}
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center" textTransform="capitalize">
                {category.description}
              </Typography>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
};

export default AsideMenu;
