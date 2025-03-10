import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NavListDrawer from "./NavListDrawer";
import { useState } from 'react';
import { Home, WbSunny, Map, Info } from "@mui/icons-material";

const navLinks = [
  {
    title: 'Home',
    path: '/',
    icon: <Home/>
  },
  {
    title: 'Weather',
    path: '/Weather',
    icon: <WbSunny/>
  },
  {
    title: 'Map',
    path: '/Map',
    icon: <Map/>
  },
  {
    title: 'About us',
    path: '/About',
    icon: <Info/>
  }
];

export default function Navbar () {

  const [open, setOpen] = useState(false);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setOpen(true)}
            sx = {{display: {xs: 'flex', sm: 'none'}}}
            edge="start"
            >
            <MenuIcon/> 
          </IconButton>

          <Typography 
            variant="h6"
            sx = {{ flexGrow: 1}}
            > The Weather Tracking Co. 
          </Typography>
          <Box sx = {{display: {xs: 'none', sm: 'block'}}}>
                {navLinks.map((item) => (
                  <Button
                    color="inherit"
                    key={item.title}
                    component = "a"
                    href = {item.path}
                    >
                    {item.title}
                  </Button>
                ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx = {{display: {xs: 'flex', sm: 'none'}}}
      >
        <NavListDrawer navLinks={navLinks}/>
      </Drawer>
    </>
  );



}