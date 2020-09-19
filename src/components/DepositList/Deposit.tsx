import * as React from 'react';

import {
    Card, Theme, makeStyles, createStyles,
    CardHeader, CardContent,
    Button, CardMedia, CardActions, ButtonGroup, Box
} from '@material-ui/core'

import firebase from '../../firebase'
import { firestore } from '../../firebase'

import ItemsList from './ItemsList'
import testImg from './img.jpeg'
interface Props {
    deposit: IDeposit,
    showImage: (url: string) => void,  
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
        photo: {
            width: '300px',
            height: '300px',
            padding: 0, 
            margin: 0, 
            fit: 'cover', 
        },
        content: {
            padding: 0,
            "&:last-child": {
                paddingBottom: 0
            },
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'column',
        },
        left: {
            justifySelf: 'left',
        },
        right: {
            justifySelf: 'right',
        },
        inner: {
            display: 'flex',
            flexDirection: 'row',
        }

    })
);



const Deposit: React.FC<Props> = ({ deposit, showImage }) => {
    const classes = useStyles();

    const setDeposit = (userId: string, depositId: string, approved: boolean) => {
        const depositRef = firestore.doc(`/usersummary/${userId}/deposits/${depositId}`);
        depositRef.update({
            status: approved ? 'approved' : 'rejected'
        }).then(() => {
            if (approved) {
                const user = firestore.doc(`usersummary/${userId}`)
                const val = deposit.total;
                user.update({
                    totalpoints: firebase.firestore.FieldValue.increment(val * 10),
                    totalrecycled: firebase.firestore.FieldValue.increment(val),
                }).then(() => console.log('updated user totals'))
    
                firestore.collection('feedtransactions').doc().set({
                    userId: deposit.userId,
                    totalrecycled: deposit.total,
                }).then(() => console.log('added to feedtransactions'));
            }
        });


    }

    const changeCount = (key: string, add: boolean) => {
        const ref = firestore.doc(`/usersummary/${deposit.userId}/deposits/${deposit.id}`);
        const val = add ? 1 : -1;

        const newItems = Object.assign({}, deposit.items);
        newItems[key] = newItems[key] + val;

        const delta = {
            items: newItems,
            total: firebase.firestore.FieldValue.increment(val),
        };

        ref.update(delta).then(() => console.log('updated count for ' + key));
    }

    return (

        <Card className={classes.root} > 
            <Box display='flex' flexDirection='row'>
                
                <Box flexShrink={1}>
                    <img src={deposit.image} className={classes.photo} onClick={() => {showImage(deposit.image)}}/>
                </Box>

                <Box flexGrow={2}>
                    <CardHeader
                        className={classes.header}
                        subheader={deposit.id}
                        title={`${deposit.total} items`}
                    />
                    <CardContent className={classes.content}>

                        {/* <CardMedia src={deposit.image} /> */}
                        <ItemsList items={deposit.items} changeCount={changeCount} />
                    </CardContent>
                </Box>

            </Box>

            <CardActions className={classes.actions}>
                <ButtonGroup variant="contained">
                    <Button size="medium" color="secondary" onClick={() => { setDeposit(deposit.userId, deposit.id, false) }}>
                        Reject
                        </Button>
                    <Button size="medium" color="primary" onClick={() => { setDeposit(deposit.userId, deposit.id, true) }}>
                        Approve
                        </Button>
                </ButtonGroup>
            </CardActions>

        </Card>

    )
}

export default Deposit; 