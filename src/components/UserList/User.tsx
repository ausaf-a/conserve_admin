import * as React from 'react';

import { Card, Theme, makeStyles,
     createStyles, CardHeader, Button, ButtonGroup, Box,
     CardContent, Typography, CardActions, Avatar } from '@material-ui/core'


interface Props {
    user: IUser,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            margin: '12px',
            width: '50%',
            height: '20%',
        },
        header: {
            // width: '%'
        },
        actions: {
            alignSelf: 'flex-end'
        },
        avatar: {
            width: '140px',
            height: '140px',
            padding: 0, 
            margin: 0, 
            fit: 'cover', 
        },
    })
);

const User: React.FC<Props> = ({ user }) => {
    const classes = useStyles();
    return (

        <Card className={classes.root} >
            <Box display='flex' flexDirection='row'>

                <Box flexShrink={1}>
                    <Avatar src={user.photourl} className={classes.avatar} />
                </Box>

                <Box flexGrow={2}>
                    <CardHeader
                        subheader={user.userId}
                        title={`${user.firstname} ${user.lastname}`}
                    />
                </Box>

            </Box>

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Total Recycled: {user.totalrecycled}
                </Typography>
            </CardContent>
            
            <CardActions className={classes.actions}>
                <ButtonGroup variant="contained">
                    
                    <Button size="medium" color="secondary" onClick={() => { alert('Not implemented') }}>
                        Delete
                    </Button>
                    <Button size="medium" color="primary" onClick={() => { alert('Not implemented') }}>
                        View Details
                    </Button>
                
                </ButtonGroup>
            </CardActions>

        </Card>

    )
}

export default User; 