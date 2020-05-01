import React from "react";
import NewRoomButton from "../components/NewRoomButton"
import { Typography, Grid, Paper} from '@material-ui/core';


const HomePage = () => {
  return (
    <Grid container justify="center">
      <Grid justify="center">
        <Typography variant="h5">Welcome to UUVID-19 Video chat app</Typography>
        <NewRoomButton/>
      </Grid>
    </Grid>
      
  );
};

export default HomePage;
