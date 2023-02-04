import { Button, MenuItem, Select, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import FilesTree from "../components/FilesTree";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AltRouteIcon from '@mui/icons-material/AltRoute';

function BranchNavBar({currBranch,branches, setBranch}){
    function handlesSelectBranch(event){
        setBranch(event.target.value)
    }

    return (
        <Container sx={{display: "flex"}}>
            <Container sx={{ justifyContent: "start", flexDirection: "row", maxWidth: "initial" }}>

                <Typography variant="p" fontSize={24} noWrap>
                    active branch:
                </Typography>   
                <Select
                    value={currBranch}
                    onChange={handlesSelectBranch}
                    size="small"
                    
                >
                    {branches.map((branch, index)=>{
                        return (
                            <MenuItem key={branch.id} value={branch}>
                                {branch.name}
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


function RepositoryPage({repository}) {
    const [currBranch, setCurrBranch] = useState(repository.branches[0]);
    const filesList = <FilesTree currCommit={currBranch.currentCommit} />
    
    return (
        <Container className={"repositoryView"}>
            <Typography variant="h3" gutterBottom>
                {`${repository.creator}/${repository.name}`} 
            </Typography>
            <BranchNavBar currBranch={currBranch} branches={repository.branches} setBranch={setCurrBranch}/>
            <Container sx={{ml: 20, mt : 10}}>
                {filesList}
            </Container>
        </Container>
    );
}

export default RepositoryPage;