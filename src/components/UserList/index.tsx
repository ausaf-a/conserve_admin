import * as React from 'react'
import { Typography, Theme, makeStyles, createStyles } from '@material-ui/core'
import User from './User'
import { firestore, auth } from '../../firebase'

interface Props {
    users: Array<IUser>
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            margin: '0px', 
            fontSize: '35px',
        },
        list: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    })
);

const UserList: React.FC<Props> = ({users}) => {
    const classes = useStyles();

    return (
        <div>
            <Typography className={classes.title} gutterBottom>Users</Typography>
            <div className={classes.list}>
                {users.map((user: IUser) => {
                    return <User key={user.userId} user={user}/>
                })}
            </div>
        </div>
    );
}


export default UserList; 