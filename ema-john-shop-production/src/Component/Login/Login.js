import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from './loginManager';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { addSignedUser } from '../../Redux/Actions/StoreActions';
import { connect } from 'react-redux';




const Login = ({addSignedUser, allUsers}) => {

  const { handleSubmit, register, errors, reset } = useForm();

  //states
  // const [user, setUser] = useState({
  //   isSignedIn : false,
  //   name: '',
  //   email: '',
  //   password: '',
  //   photo: '',
  //   error: '',
  //   success: false
  // })

  //localize
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // const googleSignIn = () => {
  //   handleGoogleSignIn()
  //   .then(res => {
  //     addSignedUser(res);
  //     history.replace(from);
  //   })
  // }

  // const fbSignIn = () => {
  //   handleFbSignIn()
  //   .then(res => {
  //     console.log(res);
  //   })
  // }

  // const signOut = () => {
  //   handleSignOut()
  //   .then(res => {
  //     setUser(res);
  //     //setLoggedInUser(res);
  //   })
  // }
  
  // const handleSubmit= (e) => {
    // if(newUser && user.email && user.password){
    //   createUserWithEmailAndPassword(user.name, user.email, user.password)
    //   .then(res => {
    //     setUser(res);
    //     setLoggedInUser(res);
    //     history.replace(from);
    //   })
    // }
    // else if(!newUser && user.email && user.password){
    //   signInWithEmailAndPassword(user.email, user.password)
    //   .then(res => {
    //     setUser(res);
    //     setLoggedInUser(res);
    //     history.replace(from);
    //   })
    // }
  //   e.preventDefault(); 
  // }

  const addUserToRedux = email => {
    const [selectedUser] = allUsers.filter(user => user.email === email);
    addSignedUser(selectedUser);
  }

  const onSubmit = handleSubmit((data) => {
    const {email, password} = data;
    if(email && password){
      signInWithEmailAndPassword(email, password)
      .then(userData => {
        if(userData){
          addUserToRedux(userData?.email);
          history.replace(from);
          reset({});
        }
      })

    }
  });

  return (
    <Container className="my-5" maxWidth="xs">
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  inputRef={register({ required: true })}
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
                />
                {errors.email && <span className="text-danger">This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  inputRef={register({ required: true, minLength: 6})}
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                />
                {errors.password && errors.password.type === "required" && <span className="text-danger">This field is required</span>}
                {errors.password && errors.password.type === "minLength" && <span className="text-danger">Must 6 charecter long</span>}
                {errors.password && errors.password.type === "pattern" && <span className="text-danger">Must have alphabets and numbers</span>}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth type="submit" variant="contained">
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    allUsers: state.allUsers
  }
}

const mapDispatchToProps = {
  addSignedUser : addSignedUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
