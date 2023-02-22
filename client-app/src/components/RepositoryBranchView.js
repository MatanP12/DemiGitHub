import { Button, MenuItem, Select, Typography } from "@mui/material";
import { Container } from "@mui/system";
import FilesTree from "../components/FilesTree";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AltRouteIcon from '@mui/icons-material/AltRoute';

function BranchNavBar({repoBranchName,branchesNames, setBranch}){
    function handlesSelectBranch(event){
        const selectedBranchName = event.target.value;
        setBranch(selectedBranchName);
    }

    return (
        <Container sx={{display: "flex", }}>
            <Container sx={{ justifyContent: "center", flexDirection: "row", maxWidth: "initial" , maxHeight:"min-content"}}>

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

export default function RepositoryBranchView({setBranch, currCommit, currBranch, branchesList}){

    return (
        <Container >
            <BranchNavBar repoBranchName={currBranch} branchesNames={ branchesList} setBranch={setBranch}/>
            <FilesTree currCommit={currCommit}/>
        </Container>
    )
}
