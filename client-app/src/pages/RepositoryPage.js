import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import RepositoryBranchView from "../components/RepositoryBranchView";



function RepositoryPage({repository}) {
    const [currRepository, setCurrRepository] = useState(repository); 
    const currBranchCommit = currRepository.branches.get(currRepository.currBranch);
    function setBranchCommit(newBranch){
        setCurrRepository((prevRepository)=>{
            return {
                ...prevRepository,
                currBranch : newBranch
            }
        })
    }
    return (
        <Container className={"repositoryView"}>
            <Typography variant="h3" gutterBottom>
                {`${currRepository.creator}/${currRepository.name}`} 
            </Typography>
            <RepositoryBranchView 
                setBranch={setBranchCommit} 
                currCommit={currBranchCommit} 
                currBranch={currRepository.currBranch} 
                branchesList={[...currRepository.branches.keys()]}
                />

        </Container>
    );
}

export default RepositoryPage;