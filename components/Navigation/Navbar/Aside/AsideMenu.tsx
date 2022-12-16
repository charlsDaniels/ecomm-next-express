import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { Category } from "../../../../types/Category";
import Link from "next/link";

interface AsideMenuProps {
  categories: Category[];
}

const AsideMenu: React.FC<AsideMenuProps> = ({ categories }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="account of current user"
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
