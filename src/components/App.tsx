import {
  createStyles, makeStyles,
  Theme
} from '@material-ui/core';
import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { firestore } from '../firebase';
import Dashboard from './Dashboard';
import DepositList from './DepositList';
import Layout from './Layout/index';
import UserList from './UserList';
import Confirm from './Dialogs/Confirm';  

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

  /**
   * Set up update callbacks after first    render
   */
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
 
      <Layout title={title}>
          <Switch>
            <Route exact path='/' render={() => <Dashboard />} />
            <Route exact path='/users' render={() => <UserList users={users} />} />
            <Route exact path='/deposits' render={() => <DepositList deposits={deposits} />} />
          </Switch>
      </Layout>

    </div>
  );
}

export default App;
