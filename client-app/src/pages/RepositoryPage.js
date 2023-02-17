import { Button, MenuItem, Select, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import FilesTree from "../components/FilesTree";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import ObjectMapContext from "../context/ObjectMapContext";

function BranchNavBar({repoBranchName,branchesNames, setBranch}){
    function handlesSelectBranch(event){
        const selectedBranchName = event.target.value;
        setBranch(selectedBranchName);
    }

    return (
        <Container sx={{display: "flex"}}>
            <Container sx={{ justifyContent: "start", flexDirection: "row", maxWidth: "initial" }}>

                <Typography variant="p" fontSize={24} noWrap>
                    active branch:
                </Typography>   
                <Select
                    value={repoBranchName}
                    onChange={handlesSelectBranch}
                    size="small"
                >
                    {branchesNames.map((branchName, index)=>{
                        return (
                            <MenuItem key={index} value={branchName}>
                                {branchName}
                            </MenuItem>
                        )
                    })}                  
                </Select>
            </Container>
            <Container sx={{alignSelf:"center", justifyContent:"right", flexDirection: "row-reverse"}}>
                <Button variant="outlined" 
                        
                        onClick={()=>{/* TODO: Create new branch form */}}
                        sx={{mr: 3}}
                        >
                        <AltRouteIcon/>
                        <Typography variant="p" fontSize={"small"} >
                            New branch
                        </Typography>
                </Button>
                <Button>
                    <UploadFileIcon/>
                    Add new File
                </Button>

            </Container>
        </Container>
    );
}

function RepositoryView({repository}){
    // console.log(repository);
    const [currBranch, setCurrBranch] = useState(repository.currBranch);
    const currBranchCommit = repository.branches.get(repository.currBranch)
    const [currCommit, setCurrCommit] = useState(repository.objectsMap.get(currBranchCommit));    
    function setBranchCommit(newBranch){
        const currBranchCommit = repository.branches.get(newBranch);
        setCurrCommit(repository.objectsMap.get(currBranchCommit));
        setCurrBranch(newBranch);
    }

    return (
        <Container >
            <BranchNavBar repoBranchName={currBranch} branchesNames={[...repository.branches.keys()]} setBranch={setBranchCommit}/>
            <ObjectMapContext.Provider value={repository.objectsMap}>
                <FilesTree currCommit={currCommit}/>
            </ObjectMapContext.Provider>
        </Container>
    )
}


function RepositoryPage({repository}) {
    return (
        <Container className={"repositoryView"}>
            <Typography variant="h3" gutterBottom>
                {`${repository.creator}/${repository.name}`} 
            </Typography>
            <RepositoryView repository={repository}/>
        </Container>
    );
}

export default RepositoryPage;