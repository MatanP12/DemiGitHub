import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {  useState } from "react";
import FilePageDialog from "./FilePageDialog";

function FileListItem({file, folderLevel, folderPath}){
    const [openFileDialog, setOpenFileDialog] = useState(false);
    return (
        <>
            <ListItemButton sx={{pl: folderLevel, }} onClick={()=>{setOpenFileDialog(true)}}>
                <ListItemIcon>
                    <TextSnippetIcon />
                </ListItemIcon>
                    <ListItemText primary={file.name}/>
            </ListItemButton>
            <FilePageDialog  isOpen={openFileDialog} closePopUp={()=>{setOpenFileDialog(false)}} file={{...file, filePath: folderPath}}  />
        </>
    );
}

function FolderListItem({currFolder, folderLevel, folderPath}) {
    const [isExpended, setIsExpended] = useState(true);
    const parentFolderPath = `${folderPath}/${currFolder.name}`
    const files = [...currFolder.fileContent.values()].map((currObject)=>{
        if(currObject.type === "File"){
            return <FileListItem key={currObject.sha1} file={currObject} folderLevel={folderLevel +3} folderPath={parentFolderPath}/>
        }
        else{
            return <FolderListItem key={currObject.sha1} currFolder={currObject} folderLevel={folderLevel+3} folderPath={parentFolderPath}/>
        }
    })
    
    return (
        <>
            <ListItemButton sx={{ pl: folderLevel}} onClick={ ()=>{ setIsExpended(!isExpended)}}>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={currFolder.name} />
                {isExpended ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={isExpended}>
                <List disablePadding sx={{ pl: folderLevel }}>
                        {files}  
                </List>

            </Collapse>
        </>
    );
}

function FilesTree({currCommit}){
    const rootFolder = currCommit.rootFolder;
    const rootFolderContent = [...rootFolder.fileContent.values()].map((currObject)=>{
        if(currObject.type === "File"){
            return <FileListItem key={currObject.sha1} file={currObject} folderLevel={0} folderPath={`${rootFolder.name}`}/>
        }
        else{
            return <FolderListItem key={currObject.sha1} currFolder={currObject} folderLevel={0} folderPath={`${rootFolder.name}`}/>
        }
    })

    return (
        <List sx={{width: '100%', maxWidth: "50%", }}
            subheader={
                <ListSubheader>
                    {currCommit.commitTitle}
                </ListSubheader>
            }
        >
            {rootFolderContent}
        </List>
    )

}


export default FilesTree;