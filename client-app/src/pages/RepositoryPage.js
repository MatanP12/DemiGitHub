import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import CommitDialog from "../components/CommitDialog";
import RepositoryBranchView from "../components/RepositoryBranchView";
import StageFileContext from "../context/RepositoryContext";



function RepositoryPage({repository}) {
    const [currBranch, setCurrBranch] = useState(repository.mainBranch);
    const [currCommit, setCurrCommit] = useState(repository.branches.get(currBranch));
    const [stagedFiles, setStagedFiles] = useState(new Map());
    const [openCommitDialog, setOpenCommitDialog] = useState(false);


    function setBranchCommit(newBranch){
        if(stagedFiles.length === 0){
            setCurrBranch(newBranch);
            setCurrCommit(repository.branches.get(newBranch));
        }
    }

    return (
        <Container className={"repositoryView"}>
            <Typography variant="h3" gutterBottom>
                {`${repository.creator}/${repository.name}`} 
            </Typography>
            <Button onClick={()=>{setOpenCommitDialog(true)}}>
                {stagedFiles.size + " Commit"}
            </Button>
            <StageFileContext.Provider value={()=>{console.log("Clicked")}}>
                <RepositoryBranchView 
                    setBranch={setBranchCommit} 
                    currCommit={currCommit}
                    currBranch={currBranch} 
                    branchesList={[...repository.branches.keys()]}
                    />
            </StageFileContext.Provider>
            <CommitDialog isOpen={openCommitDialog} stagedFiles={[...stagedFiles.values()]} handleClose={setOpenCommitDialog}/>
        </Container>
    );
}

export default RepositoryPage;