import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from "react";

function FileListItem({file, folderLevel, parentFolder}){
    return (
        <ListItemButton sx={{pl: folderLevel, }}>
            <ListItemIcon>
                <TextSnippetIcon />
            </ListItemIcon>
                <ListItemText primary={file.name}/>
        </ListItemButton>
    );
}

function FolderListItem({currFolder, folderLevel, parentFolder}) {
    const [isExpended, setIsExpended] = useState(true);
    const files = currFolder.fileContent.map((currObject)=>{
        if(currObject.type === "File"){
            return <FileListItem key={currObject.id} file={currObject} folderLevel={folderLevel +3} parentFolder={currFolder}/>
        }
        else{
            return <FolderListItem key={currObject.id} currFolder={currObject} folderLevel={folderLevel+3} parentFolder={currFolder}/>
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
    const rootFolderContent = rootFolder.fileContent.map((currObject)=>{
        if(currObject.type === "File"){
            return <FileListItem key={currObject.id} file={currObject} folderLevel={0} parentFolder={rootFolder}/>
        }
        else{
            return <FolderListItem key={currObject.id} currFolder={currObject} folderLevel={0} parentFolder={rootFolder}/>
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