import * as React from 'react';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import RepositoryPage from './RepositoryPage';
import repositories from '../test data/repositories';

function App() {
    return (
        <>
            <Header/>
            <Container sx={{margin: "10px"}}>
            {/* <Home/> */}
            <RepositoryPage repository={repositories[0]}/>
            </Container>
            <Footer/>
        </>
    );
}

export default App;
