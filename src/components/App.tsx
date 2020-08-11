import {
  createStyles, makeStyles,
  Theme
} from '@material-ui/core';
import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { firestore } from '../firebase';
import Dashboard from './Dashboard';
import DepositView from './DepositView';
import Layout from './Layout/index';
import UserView from './UserView';


interface Props {

};

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

const App: React.FC<Props> = props => {
  const classes = useStyles();

  const [view, setView] = React.useState('deposits');

  //Create state hooks to track objects from various firebase collections 
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [deposits, setDeposits] = React.useState<IDeposit[]>([]);
  const [items, setItems] = React.useState([]);
  const [title, setTitle] = React.useState('Conserve Admin Dashboard');

  React.useEffect(() => {

    /**
     * Updates list of users from firebase
     * @param snapshot 
     */
    const updateUsers = (snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
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

    /**
     * Updates list of deposits from firebase 
     * @param snapshot 
     */
    const updateDeposits = (snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
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
    };

    // create firestore refs to usersummary and deposits
    const userSummary = firestore.collection('usersummary');
    const userDeposits = firestore.collectionGroup('deposits');

    //bind the update methods to be called when the collections change
    const unsubDeposits = userDeposits.onSnapshot(updateDeposits);
    const unsubUsers = userSummary.onSnapshot(updateUsers);

    // call functions to unsubscribe from firestore changes 
    return () => {
      unsubDeposits();
      unsubUsers();
    } // return unsubscribe handler
  }, [])

  return (

    <div className={classes.root}>

      {/* <CssBaseline />

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
            <ListItem button onClick={() => { setView('dashboard') }}>
              <ListItemText primary='Dashboard' />
            </ListItem>

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
      </Drawer> */}


      <Layout title={title}>
        <main className={classes.content}>
          <Switch>
            <Route exact path='/' render={() => <Dashboard />} />
            <Route exact path='/users' render={() => <UserView users={users} />} />
            <Route exact path='/deposits' render={() => <DepositView deposits={deposits} />} />
          </Switch>
        </main>
      </Layout>

    </div>
  );
}

export default App;
