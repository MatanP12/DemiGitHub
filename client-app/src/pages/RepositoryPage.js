import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import RepositoryBranchView from "../components/RepositoryBranchView";
import ObjectsMapContext from "../context/ObjectMapContext";



function RepositoryPage({repository}) {
    const [currBranch, setCurrBranch] = useState(repository.currBranch);
    const currBranchCommit = repository.branches.get(repository.currBranch)
    const [currCommit, setCurrCommit] = useState(repository.objectsMap.get(currBranchCommit));    
    function setBranchCommit(newBranch){
        const currBranchCommit = repository.branches.get(newBranch);
        setCurrCommit(repository.objectsMap.get(currBranchCommit));
        setCurrBranch(newBranch);
    }
    return (
        <Container className={"repositoryView"}>
            <Typography variant="h3" gutterBottom>
                {`${repository.creator}/${repository.name}`} 
            </Typography>
            <ObjectsMapContext.Provider value={repository.objectsMap}>
                <RepositoryBranchView 
                    setBranch={setBranchCommit} 
                    currCommit={currCommit} 
                    currBranch={currBranch} 
                    branchesList={[...repository.branches.keys()]}

                    />

            </ObjectsMapContext.Provider>
        </Container>
    );
}

export default RepositoryPage;