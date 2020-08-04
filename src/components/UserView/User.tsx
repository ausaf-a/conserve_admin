import * as React from 'react';

import { Card, Theme, makeStyles, createStyles, CardHeader, CardContent, Typography } from '@material-ui/core'


interface Props {
    user: IUser, 
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        card: {
            margin: '12px',
            width: '80%',
            display: 'flex',
            flexDirection: 'row'
        }
    })
);

const User: React.FC<Props> = ({user}) => {
    const classes = useStyles();
    return (

        <Card className={classes.card}>
            <CardHeader
                title={`${user.firstname} ${user.lastname}`}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Total Recycled: {user.totalrecycled} 
                 </Typography>
            </CardContent>
        </Card>

    )
}

export default User; 