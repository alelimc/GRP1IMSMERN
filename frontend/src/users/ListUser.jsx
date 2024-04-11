import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import { list } from "./api-user.js";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import auth from '../lib/auth-helper.js'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default function Users() {
  const [users, setUsers] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  useEffect(() => {
    const fetchData = async () =>{
        try {
            const jwt = auth.isAuthenticated();
            const admin = auth.isAdmin();
            const data = await list({userId: jwt.user._id, t: jwt.token})
            if (data.error){
                setRedirectToSignin(true)
            } else{
                setUsers(data);
            }
        } catch (error){
            console.error(error)
        }
    }

    fetchData();
    return() => {

    }

    // const abortController = new AbortController();
    // const signal = abortController.signal;
    // list(signal).then((data) => {
    //   if (data && data.error) {
    //     console.log(data.error);
    //   } else {
    //     setUsers(data);
    //   }
    // });
    // return function cleanup() {
    //   abortController.abort();
    // };
  }, []);

  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={4} style={{ marginTop: "70px" }}>
      <Typography variant="h6">All Users</Typography>
      <List dense>
        {users.map((item, i) => (
          <Link component={RouterLink} to={"/admin/users/" + item._id} key={i}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton>
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  );
}
