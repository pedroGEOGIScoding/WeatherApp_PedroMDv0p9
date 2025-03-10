import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Navbar from './Navbar';

export default function NavListDrawer({navLinks}) {

  return (

    <Box sx = {{width: 250}}>
      <nav>
      <List>
        {navLinks.map((item) => (
          <ListItem
            disablePadding
            key={item.title}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemButton component = "a" href = {item.path}>
              <ListItemText>{item.title}</ListItemText>
            </ListItemButton>        
          </ListItem>
          ))}
      </List>
      </nav>
    </Box>
  );
}

