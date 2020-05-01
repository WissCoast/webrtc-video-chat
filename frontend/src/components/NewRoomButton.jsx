import React from "react";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom"
import { Button } from '@material-ui/core';
import { Grid, Paper} from '@material-ui/core';
import VideoCallIcon from '@material-ui/icons/VideoCall';

const NewRoomButton = () => {
    const history = useHistory()
    const randomId = v4();
    return (
        <Grid container justify="center">
            <Grid item>
                <Paper>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<VideoCallIcon/>}
                        onClick={() => history.push('/chat/' + randomId)}>
                        Create new chat group!
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default NewRoomButton;
