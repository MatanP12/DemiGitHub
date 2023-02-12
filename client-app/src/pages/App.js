import * as React from 'react';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import repositories from '../test data/repositories';
import FilePage from './FilePage';

function App() {
    const folderPath = 
    repositories[0].name + "/" +
    repositories[0].branches[0].currentCommit.rootFolder.name + "/";
    console.log("FULLFILEPATH=", folderPath)
    return (
        <>
            <Header/>
            <Container sx={{margin: "10px"}}>
            <FilePage file={repositories[0].branches[0].currentCommit.rootFolder.fileContent[0]} fileFolderPath={folderPath}/>
            </Container>
            <Footer/>
        </>
    );
}

export default App;
