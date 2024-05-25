import  React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';


 function NavBar() {
    const val=useNavigate();
    const val1=useNavigate();
    const Pay=()=>{
        val('/')
    }
    const trn=()=>{
        val1('/transaction')
    }
  return (
    <Box sx={{ flexGrow: 1,backgroundColor:'black' }} >
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
        <Typography variant="h6" component="div" >
            Backend
          </Typography>
          
            <Box sx={{ ml: 'auto' }}>
            <Button color="inherit" onClick={Pay}>Payment</Button>
            <Button color="inherit" onClick={trn}>Transaction</Button>

            </Box>
          
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar