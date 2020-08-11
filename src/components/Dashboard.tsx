import * as React from 'react'
import { Typography, Theme, makeStyles, createStyles } from '@material-ui/core'
import { firestore, auth } from '../firebase';

interface Props { }

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

const Dashboard: React.FC<Props> = () => {
    const classes = useStyles();

    return <h1>{'hello'}</h1>
}


export default Dashboard;