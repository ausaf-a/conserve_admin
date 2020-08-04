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
            justifySelf: 'left',
            paddingTop: '20%',
            width: '20%',
            height: '20%'
            // paddingTop: '56.25%', // 16:9,
            // marginTop:'30'
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

const Deposit: React.FC<Props> = ({ deposit }) => {
    const classes = useStyles();

    const setDeposit = (userId: string, depositId: string, approved: boolean) => {
        const depositRef = firestore.doc(`/usersummary/${userId}/deposits/${depositId}`);
        depositRef.update({
            status: approved ? 'approved' : 'rejected'
        }).then(() => console.log('updated deposit'));

        if (approved) {
            const user = firestore.doc(`usersummary/${userId}`)
            const val = deposit.total; 
            user.update({
                totalpoints: firebase.firestore.FieldValue.increment(val*10), 
                totalrecycled: firebase.firestore.FieldValue.increment(val), 
            })

            firestore.collection('feedtransactions').doc().set({
                userId: deposit.userId, 
                totalrecycled: deposit.total, 
            }).then();
            
        }
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

        <Card className={classes.root}>
            <Box flexDirection='row'>
                <Button className={classes.left}>Justified Left</Button>
                <Button className={classes.right}>Justified Right</Button>
                {/* <Box flexGrow={1}> */}

                {/* </Box> */}


                <Box alignSelf='flex-end' flexGrow={2}>
                    <CardHeader
                        className={classes.header}
                        subheader={deposit.id}
                        title={`${deposit.total} items`}
                    />
                    <CardContent className={classes.content}>
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