import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

function Header() {
    return (
        <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'nowarp'}}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            DemiGitHub
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              My Repositories
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Create new Repository
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Profile
            </Link>
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

    )
}


function Footer () {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="localhost:3000">
        DemiGit
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
    )

}


function App() {
    return (
        <>
            <Header/>
            <Container sx={{margin: "10px"}}>
            <h1> Hello World</h1>
            </Container>
            <Footer/>
        </>
    );
}

export default App;
