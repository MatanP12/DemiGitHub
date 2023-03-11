import { Button, Container, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material"
import RestorePageIcon from '@mui/icons-material/RestorePage';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

function CommitForm({onChangeCommit, commit}){

    return (
        <Container component="form">
            <Container >
                <Typography>
                    Commit title
                </Typography>
                <TextField
                name="title"
                value={commit.title}
                variant="filled"
                fullWidth
                onChange={onChangeCommit}
                />
            </Container>
            <Container sx={{mt:2}}>
                <Typography>
                    Commit message
                </Typography>
                <TextField
                    name="message"
                    value={commit.message}
                    multiline
                    maxRows={4}
                    fullWidth
                    onChange={onChangeCommit}

                />
            </Container>
        </Container>
    )
}


function StagedFilesListItem({file}){
    return (
        <ListItem>
            <ListItemIcon>
                <RestorePageIcon/>
            </ListItemIcon>
            <ListItemText primary={file.filePath + "/" + file.name} secondary={file.status}/>
        </ListItem>
    )
}

function StagedFilesList({stagedFiles}){

    return (
        <List subheader={"Staged Files"} sx={{border:1}}>
            {stagedFiles.map((currFile, index)=>{
                return (

                    <StagedFilesListItem key={currFile.sha1} file={currFile} />
                )
            })}
        </List>
    )


}

function CommitDialog({ commit ,stagedFiles, isOpen, handleClose}){    
    const [currCommit, setCurrCommit] = useState({
        ...commit,
        title : "",
        message: "",
    });

    const handleCloseNewPopup = (event, reason) => {
        if(reason && reason === "backdropClick"){
            return;
        }
        handleClose(false);
    };

    function handleChangeCommit(event){
        const {name, value} = event.target;
        setCurrCommit((prevCommit)=>{
            return {
                ...prevCommit,
                [name]:value
            }
        })

    }

    return (
        <Dialog         
            fullWidth={true}
            maxWidth="md"
            open={isOpen}
            onClose={handleCloseNewPopup}
            disableEscapeKeyDown={true}
        >
            <DialogTitle>
                Commit
                <IconButton
                    aria-label="close"
                    onClick={handleCloseNewPopup}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>

            </DialogTitle>
            <DialogContent sx={{alignItems:"center", justifyContent:"center", mb:3}}>
                <CommitForm onChangeCommit={handleChangeCommit} commit={currCommit}/>
                <Container sx={{mt:1}}>
                    <StagedFilesList stagedFiles={stagedFiles} />
                </Container>
            </DialogContent>
        </Dialog>

    )
}


export default CommitDialog