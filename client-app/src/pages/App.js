import * as React from 'react';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';


function App() {
    return (
        <>
            <Header/>
            <Container sx={{margin: "10px"}}>
            <Home/>
            </Container>
            <Footer/>
        </>
    );
}

export default App;
