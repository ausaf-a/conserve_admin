import * as React from 'react'
import { Typography, Theme, makeStyles, createStyles, Card, Button, CircularProgress, Dialog, DialogTitle } from '@material-ui/core'
import { firestore } from '../../firebase'
import Deposit from './Deposit'
import User from '../UserList/User'

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

const DepositList: React.FC<Props> = ({ deposits }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState('');

    const testDep = {
        image: '',
        items: {} as IDepositItems,
        status: 'pending',
        submitted: {},
        total: 42,
    } as IDeposit;

    const showImage: (url: string) => void = (url) => {
        if (!open) {
            setImage(url);
            setOpen(true);
        }
    }

    return (
        <div>
            <Typography className={classes.title} gutterBottom>Pending Deposits</Typography>

            <div className={classes.list}>
                {deposits.map((deposit) => {
                    return <Deposit showImage={showImage} deposit={deposit} />
                })}
            </div>

            <Dialog maxWidth='lg' onClose={() => {setOpen(false)}} open={open}>
                <img src={image}/>
            </Dialog>
        </div>
    )
}

export default DepositList; 