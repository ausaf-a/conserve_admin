import * as React from 'react'
import { Typography, Theme, makeStyles, createStyles, Card, Button, CircularProgress } from '@material-ui/core'
import { firestore } from '../../firebase'
import Deposit from './Deposit'
import User from '../UserView/User'

interface Props {
    deposits: Array<IDeposit>;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontSize: '35px',
        },
        list: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

    })
);



const DepositView: React.FC<Props> = ({ deposits }) => {
    const classes = useStyles();

    const testDep = {
        image: '',
        items: {} as IDepositItems,
        status: 'pending',
        submitted: {},
        total: 42,
    } as IDeposit;



    return (
        <div>
            <Typography className={classes.title} gutterBottom>Pending Deposits</Typography>

            <div className={classes.list}>
                {deposits.map((deposit) => {
                    return <Deposit deposit={deposit} />
                })}

            </div>
        </div>
    )
}

export default DepositView; 