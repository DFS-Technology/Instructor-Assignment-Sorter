import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import {Link as Nextlink} from 'next/link'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useRouter} from 'next/router';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';
import { ContactlessOutlined, SettingsInputSvideoRounded } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from "../../lib/use-auth.js";
import { useRequireAuth } from "../../lib/use-require-auth.js";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));


export default function Login() {
  const classes = useStyles();
  const auth = useAuth(); 
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  var user =  firebase.auth().currentUser;
  
  useEffect(()=>{
    if(auth.user){
      router.push('/');
    }
  }, [auth.user]);

  const onChangeHandler = (event) => {
      const {name, value} = event.currentTarget;
      setError(false);
      setErrorMsg('');
      if(name === 'email') {
          setEmail(value);
      }
      else if(name === 'password'){
        setPassword(value);
      }
  };

  const onSignIn = () => {
    auth.signin(email, password).then(function(user){
      if(user){
        console.log([user.uid,user.email]);
        router.push('/');
      }
    }
    ).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      setErrorMsg(errorMessage);
      setError(true);
    });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
      if(user){
        console.log([user.uid,user.displayName,user.email]);
        router.push('/');
        }else{
          setError(true);
        }
    }
    ).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      setErrorMsg(errorMessage);
      setError(true);
    });
  };  
    // useEffect(() => {
    //   if(firebase.auth().currentUser){
    //     console.log(firebase.auth().currentUser);  
    //     router.push('/');
    //   }
    // });
    
  

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}  >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => onChangeHandler(event)}
            error={error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => onChangeHandler(event)}
            error={error}
            helperText={errorMsg}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event)=>{onSignIn(event)}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={Nextlink} href="/authentication/forgotpass" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={Nextlink} href="/authentication/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}