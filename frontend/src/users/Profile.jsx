import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import auth from '../lib/auth-helper.js';
import { Navigate, Link } from 'react-router-dom';
import { listId, remove } from './api-user.js';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px`,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em',
  },
  addButton: {
    float: 'right',
  },
  leftIcon: {
    marginRight: '8px',
  },
}));

export default function MyProfile() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = auth.isAuthenticated();
        const user = await listId({ userId: jwt.user._id }, { t: jwt.token });
        if (user.error) {
          setRedirectToSignin(true);
        } else {
          setUsers(user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      // Cleanup
    };
  }, []);

  const deleteUser = async (user) => {
    try {
      const jwt = auth.isAuthenticated();
      const data = await remove(
        { userId: users._id }, 
        { t: jwt.token }
    );
      if (data.error) {
        console.error(data.error);
      } else {
        auth.clearJWT(() => console.log('deleted'));
        setRedirectToSignin(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          User Profile
          <span className={classes.addButton}>
            <Link to={`/edit/${users._id}`}>
              <IconButton aria-label="Edit" color="primary">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton aria-label="Delete" color="secondary" onClick={deleteUser}>
              <DeleteIcon />
            </IconButton>
          </span>
        </Typography>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                {/* Display initial letter of the user's name */}
                {users && users.name && users.name.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`Username: ${users && users.name}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Email: ${users && users.email}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Date Joined: ${users && new Date(users.created).toDateString()}`} />
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}
