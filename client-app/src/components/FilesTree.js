import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
//import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from "react";

function FileListItem({file, folderLevel}){
    return (
        <ListItemButton sx={{pl: folderLevel, }}>
            <ListItemIcon>
                <TextSnippetIcon />
            </ListItemIcon>
                <ListItemText primary={file.name}/>
        </ListItemButton>
    );
}

function FolderListItem({currFolder, folderLevel}) {
    const [isExpended, setIsExpended] = useState(true);
    const files = currFolder.fileContent.map((currFolderItem)=>{
        if(currFolderItem.type === "File"){
            return <FileListItem key={currFolderItem.id} file={currFolderItem} folderLevel={folderLevel +3} />
        }
        else{
            return <FolderListItem key={currFolderItem.id} currFolder={currFolderItem} folderLevel={folderLevel+3}/>
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
    const rootFolderContent = rootFolder.fileContent.map((currFolderItem)=>{
        if(currFolderItem.type === "File"){
            return <FileListItem key={currFolderItem.id} file={currFolderItem} folderLevel={0} />
        }
        else{
            return <FolderListItem key={currFolderItem.id} currFolder={currFolderItem} folderLevel={0}/>
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