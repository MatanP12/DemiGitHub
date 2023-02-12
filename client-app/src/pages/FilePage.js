import { Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ReactCodeMirror from "@uiw/react-codemirror";
import Grid from '@mui/material/Grid';

import { useCallback, useState } from "react";

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function FileEditPanel({onSave, onRevent}){
    return (
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
    );
}

function FileViewPanel({onChangeMode, onDeleteFile}){
    return (
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

    );

}


function FilePage({file, fileFolderPath}){
    const [currFile, setCurrFile] = useState(file);
    const [isEditMode, setIsEditMode] = useState(false);


    function handleSaveFile(){
        setIsEditMode(false);
        console.log(currFile)
        // TODO: Stage File Edit
    }

    function handleDeleteFile(){
        setIsEditMode(false);
        // TODO: Stage file deletion

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
        <Container>

            <Container sx={{display: "flex", alignItems:"center"}}>
                {isEditMode ?
                    <>
                        <Typography noWrap sx={{alignContent:"flex-start", overflow:"unset"}}>
                            {fileFolderPath}
                        </Typography>
                        <TextField placeholder={currFile.name} size="small" name="name" onChange={handleChangeFileName}/> 
                        <FileEditPanel onSave={()=> {handleSaveFile()}} onRevent={handleReventFileChanges}/>
                    </> :
                    <>
                        <Typography variant="h5"  noWrap sx={{alignContent:"flex-start", overflow:"unset"}}>
                            {fileFolderPath + currFile.name}
                        </Typography>
                        <FileViewPanel
                            onChangeMode = {()=>{setIsEditMode(!isEditMode)}}
                            onDeleteFile={handleDeleteFile}/>
                    </>}
            </Container>
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
            
        </Container>
    );


}


export default FilePage;