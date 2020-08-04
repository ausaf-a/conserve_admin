import * as React from 'react';
import {
  Typography, CssBaseline, Snackbar, Drawer, makeStyles,
  createStyles, ListItem, ListItemText, ListItemIcon, Divider, List, Theme, Toolbar, AppBar, Button
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail'
import InboxIcon from '@material-ui/icons/Inbox'
import DepositView from './DepositView'
import UserView from './UserView'
import { firestore } from '../firebase';

interface Props {}; 

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    }
  }),
);

 const App: React.FC<Props> = props =>  {
  const classes = useStyles();
  const [view, setView] = React.useState('deposits');

  const [users, setUsers] = React.useState<IUser[]>([]);
  const [deposits, setDeposits] = React.useState<IDeposit[]>([]);



  React.useEffect(() => {
    const onUserChange = (snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
      let userList: IUser[] = [];
      snapshot.docs.map((user) => {
        let currentUser = user.data() as IUser;

        // skip the placeholder value 
        if (currentUser.firstname !== undefined) {
          userList.push(currentUser);
        }
      });

      setUsers(userList);
    };

    const onDepositChange = (snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
      let depositList: IDeposit[] = [];
      snapshot.docs.map((deposit) => {
        let currentDep = deposit.data() as IDeposit;
        currentDep.id = deposit.id;
        if (currentDep.status === 'pending') {
          depositList.push(currentDep)
        }
      });
      console.log(depositList);
      setDeposits(depositList);
    }

    const userSummary = firestore.collection('usersummary');
    const userDeposits = firestore.collectionGroup('deposits');
    const unsubDeposits = userDeposits.onSnapshot(onDepositChange);
    const unsubUsers = userSummary.onSnapshot(onUserChange);

    return () => {
      unsubDeposits();
      unsubUsers();
    } // return unsubscribe handler
  }, [])



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Conserve Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={() => { setView('deposits') }}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary='Deposits' />
            </ListItem>

            <ListItem button onClick={() => { setView('users') }}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary='Users' />
            </ListItem>
          </List>
        </div>
      </Drawer>

      <main className={classes.content}>
        <Toolbar />
        {view == 'users' && <UserView users={users} />}
        {view == 'deposits' && <DepositView deposits={deposits} />}
      </main>
    </div>
  );
}

export default App;
