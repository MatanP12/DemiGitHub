import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ReactCodeMirror from "@uiw/react-codemirror";
import Grid from '@mui/material/Grid';
import { useCallback, useContext, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import StageFileContext from "../context/RepositoryContext";
const sha1 = require("sha-1");

function FileEditPanel({onSave, onRevent, file, onChangeFileName}){
    return (
        <Container sx={{display:'flex', alignItems:'center'}}>
            <Typography variant="h5" noWrap sx={{alignContent:"flex-start", overflow:"unset"}}>
                {file.filePath + "/"}
            </Typography>
            <TextField placeholder={file.name} size="small" name="name" variant="standard" onChange={onChangeFileName}
                sx ={{ml:0.3}}
                inputProps={{style:{fontSize:23, padding:0}}}
            /> 
            <Grid container spacing={4} sx={{justifyContent:"flex-end"}}>
                <Grid item>
                    <Button variant="outlined" onClick={()=>{onRevent()}}>
                        <CancelIcon/>
                        Revent
                    </Button>

                </Grid>
                <Grid item >
                    <Button variant="outlined" color="success" onClick={()=>{onSave()}}>
                        <SaveIcon/>
                        Stage
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

function FileViewPanel({onChangeMode, onDeleteFile, file}){
    return (
        <Container sx={{display:'flex', alignItems:'center'}}>
            <Typography variant="h5"  noWrap sx={{alignContent:"flex-start", overflow:"unset"}}>
                {file.filePath + "/" + file.name}
            </Typography>

            <Grid container spacing={4} sx={{justifyContent:"flex-end"}}>
                <Grid item>
                    <Button variant="outlined" onClick={()=>{onChangeMode()}}>
                        <EditIcon/>
                        Edit
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="error" onClick={()=>{onDeleteFile()}}>
                        <DeleteIcon/>
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

function FilePageDialog({isOpen,file, closePopUp}){
    const stageFileChange = useContext(StageFileContext);
    const [currFile, setCurrFile] = useState(file);
    const [isEditMode, setIsEditMode] = useState(false);






    function handleSaveFile(){
        currFile.sha1 = sha1(currFile.fileContent+currFile.name);
        if(currFile.sha1 === file.sha1){
            return;
        }
        if(currFile.name != file.name){
            stageFileChange(currFile, file, "ChangeName");
        }
        else{
        }


        setIsEditMode(false);
        // stageFileChange(currFile,file, "Update");
        closePopUp();
    }

    function handleDeleteFile(){
        closePopUp();
        stageFileChange(file,file, "Delete");
    }

    function handleReventFileChanges(){
        setIsEditMode(false);
        setCurrFile(file);
    }

    function handleChangeFileName(event){
        const {name, value} = event.target;
        setCurrFile((prevFile)=>{
            return {
                ...prevFile,
                [name]: value
            }
        });
    }

    const handleCloseNewPopup = (event, reason) => {
        if(reason && reason === "backdropClick"){
            return;
        }
    };

    const onChangeFileContent = useCallback((value, viewUpdate)=>{
            setCurrFile((prevFile)=>{
                return {
                    ...prevFile,
                    fileContent : value
                }
            })
        },[])

    return (
            <Dialog 
                open={isOpen}
                fullWidth={true}
                maxWidth='lg'
                onClose={handleCloseNewPopup}
                disableEscapeKeyDown={true}
            >
                <DialogTitle sx={{display:'flex', maxHeight:'min-content'}}>
                    <Container sx={{display: "flex", alignItems:"center", }}>
                        {isEditMode ?
                            <FileEditPanel onSave={()=> {handleSaveFile()}} 
                                            onRevent={handleReventFileChanges} 
                                            onChangeFileName={handleChangeFileName}
                                            file={currFile}
                                            />:
                            <FileViewPanel
                                onChangeMode = {()=>{setIsEditMode(!isEditMode)}}
                                onDeleteFile={handleDeleteFile} file={currFile}/>
                            }
                            <IconButton
                                aria-label="close"
                                onClick={()=> {closePopUp();setIsEditMode(false)}}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                                >
                                <CloseIcon />
                            </IconButton>

                    </Container>
                </DialogTitle>
                <DialogContent>
                <ReactCodeMirror 
                    value={currFile.fileContent} 
                    height="720px"
                    width="100%"
                    indentWithTab={true}
                    autoFocus={isEditMode}
                    editable={isEditMode}
                    readOnly={!isEditMode}
                    onChange={onChangeFileContent}
                />
                </DialogContent>
            </Dialog>
    );
}

export default FilePageDialog;