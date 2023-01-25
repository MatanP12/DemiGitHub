import * as React from 'react';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';


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
