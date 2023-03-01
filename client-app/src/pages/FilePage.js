import { Button, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ReactCodeMirror from "@uiw/react-codemirror";
import Grid from '@mui/material/Grid';

import { useCallback, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

function FilePageDialog({file, stageFileChange, stageFileToDelete}){
    const [currFile, setCurrFile] = useState(file);
    const [isEditMode, setIsEditMode] = useState(false);
    function handleSaveFile(){
        setIsEditMode(false);
        stageFileChange(currFile, file);
    }

    function handleDeleteFile(){
        stageFileToDelete(currFile);
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

    const onChangeFileContent = useCallback((value, viewUpdate)=>{
            setCurrFile((prevFile)=>{
                return {
                    ...prevFile,
                    fileContent : value
                }
            })
        },[])

    return (
        <>
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
        </>
    );
}

export default FilePageDialog;