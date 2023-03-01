import { Button, Dialog, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import RepositoryBranchView from "../components/RepositoryBranchView";
import SetFileContext from "../context/RepositoryContext";
import FilePageDialog from "./FilePage";
const sha1 = require("sha-1");

function deleteFolderTree(currFolder){
    const newFileContent = [...currFolder.fileContent.entries()].filter((currObject)=>{
        const isTrue = currObject[1].type !== "Folder" || currObject[1].fileContent.size !== 0;
        return isTrue; 
    })

    currFolder.fileContent = new Map(newFileContent);
    if(currFolder.parentFolder){
        return deleteFolderTree(currFolder.parentFolder);
    }
    else{
        return currFolder;
    }
}


function RepositoryPage({repository}) {
    const [currBranch, setCurrBranch] = useState(repository.mainBranch);
    const [currCommit, setCurrCommit] = useState(repository.branches.get(currBranch));
    const [choosenFile, setChoosenFile] = useState();
    const [openFileDialog, setOpenFileDialog] = useState(false);
    const [stagedFiles, setStagedFiles] = useState([]);

    function stageFileToDelete(file){
        const fileParentFolder = file.parentFolder;
        fileParentFolder.fileContent.delete(file.sha1);
        const newRoot = deleteFolderTree(fileParentFolder);
        setCurrCommit({...currCommit, rootFolder: newRoot});
        setStagedFiles([...stagedFiles, {...file, sha1:sha1(file.fileContent+file.name), status: "Delete"}])
        setOpenFileDialog(false);

    }

    function stageFileChange(file, prevFile){
        const fileParentFolder = file.parentFolder;
        file.sha1 = sha1(file.fileContent+file.name);
        fileParentFolder.fileContent.delete(prevFile.sha1);
        fileParentFolder.fileContent.set(file.sha1, file);
        setStagedFiles([...stagedFiles, {...file, status: "Update"}])
        setCurrCommit({...currCommit, rootFolder: currCommit.rootFolder});
    }

    function showFile(file, filePath){
        setChoosenFile({...file, filePath:filePath});
        setOpenFileDialog(true);
    }

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
            <SetFileContext.Provider value={showFile}>
                <RepositoryBranchView 
                    setBranch={setBranchCommit} 
                    currCommit={currCommit}
                    currBranch={currBranch} 
                    branchesList={[...repository.branches.keys()]}
                    />
            </SetFileContext.Provider>
            <Dialog 
                open={openFileDialog}
                fullWidth={true}
                maxWidth='lg'
                onClose={()=>{setOpenFileDialog(false);}}
            >
                <FilePageDialog file={choosenFile} stageFileChange={stageFileChange} stageFileToDelete={stageFileToDelete} />
            </Dialog>

        </Container>
    );
}

export default RepositoryPage;