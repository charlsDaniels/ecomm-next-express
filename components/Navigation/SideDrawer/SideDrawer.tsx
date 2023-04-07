import MenuIcon from '@mui/icons-material/Menu';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useState } from 'react';
import { swrFetcher } from 'services/api/querys';
import useSWR from 'swr';
import { Category } from 'types/Category';

export default function SideDrawer() {
  const [open, setOpen] = useState(false);

  const { data: categories } = useSWR<Category[]>('category', swrFetcher)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const categoriesList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <Typography
        variant="body1"
        fontSize={24}
        margin="12px 0 0 12px"
        noWrap
      >
        Categorías
      </Typography>
      <List>
        {categories?.map(category => (
          <ListItem key={category._id} disablePadding>
            {
              <Accordion sx={{ boxShadow: 'none' }} disableGutters>
                <AccordionSummary>
                  <Typography fontSize={20}>{category.name}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0 28px 0' }}>
                  {category.children.map(subcategory => (
                    <List key={subcategory._id} sx={{ padding: 0 }}>
                      <ListItem onClick={toggleDrawer} disablePadding>
                        <Link href={`/category/${subcategory.name}`}>
                          <ListItemText primary={subcategory.name} />
                        </Link>
                      </ListItem>
                    </List>
                  ))}
                </AccordionDetails>
              </Accordion>
            }
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="categorías"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        {categoriesList}
      </Drawer>
    </Box>
  );
}