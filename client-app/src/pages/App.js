import * as React from 'react';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import repositories from '../test data/repositories';
import FilePage from './FilePage';
import RepositoryPage from './RepositoryPage';
import Home from './Home';

function App() {
    return (
        <>
            <Header/>
            <Container sx={{margin: "10px"}}>
            {/* <Home repositories={repositories} /> */}

            <RepositoryPage repository={repositories[0]} />
            {/* <FilePage file={repositories[0].branches[0].currentCommit.rootFolder.fileContent[0]} fileFolderPath={folderPath}/> */}
            </Container>
            <Footer/>
        </>
    );
}

export default App;
