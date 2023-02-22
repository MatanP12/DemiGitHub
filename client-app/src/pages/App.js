import * as React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import repositories from '../test data/repositories';
import RepositoryPage from './RepositoryPage';

function App() {
    return (
        <>
            <Header/>
            {/* <Home repositories={repositories} /> */}
            <RepositoryPage repository={repositories[0]} />
            {/* <FilePage file={repositories[0].branches.get("main").rootFolder.fileContent[1]} fileFolderPath={"none"}/> */}
            <Footer/>
        </>
    );
}

export default App;
