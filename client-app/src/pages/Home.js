import { Grid } from "@mui/material";
import React from "react";
import RepositoryCard from "../components/RepositoryCard";
// import repositories from "../test data/repositories";

function Home({repositories}) {

    return (
        <Grid container spacing={2}>
        {repositories.map((currRepository)=>{
            return (
                <Grid key={currRepository.id} item xs={12} md={6}>
                    <RepositoryCard repository={currRepository} />
                </Grid>            
            )

        })}
        </Grid>
    )

}

export default Home;