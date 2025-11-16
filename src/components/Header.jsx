import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';


function Header() {
      const projectInfo = "A Resume Builder Web App where users can create, edit, save and download resumes.";
  return (
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'black'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img width={'30px'} src='https://imgs.search.brave.com/pvUKs_2oc_1lantUKZxjzafttThiaWpPBT2NjYpAgk0/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9yZXN1bWUt/aWNvbi1zdmctZG93/bmxvYWQtcG5nLTMx/NzM1MDEucG5nP2Y9/d2VicCZ3PTEyOA' alt='logo' />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} >
            <Link to={'/'} className='text-light text-decoration-none' >ResumeG</Link>
          </Typography>
          <Tooltip title={projectInfo}>
          <Button color="inherit font-bold" className='fw-bolder' >Login</Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
