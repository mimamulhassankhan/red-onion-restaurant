import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from './SignUpManager';
import { connect } from 'react-redux';
import { addSignedUser } from '../../../Redux/Actions/StoreActions';

const SignUp = ({user, addSignedUser, setNewUserToggler}) => {
    
    const { handleSubmit, register, errors } = useForm();

    const createUserToDb = data => {
        const userDetails = {...data, userShippingAddress:{ district:'', roadNo: '', flatNo: '', businessName: ''}, role: 'customer' }
        
        fetch('http://localhost:5000/writeSingleUser',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userDetails)
        })
        .then(res => res.json())
        .then(data => {
          addSignedUser(data);
        })
        .catch(err => console.log(err));
    }

    const onSubmit = handleSubmit((data) => {
      const {firstName, lastName, email, password} = data;
      const fullName = `${firstName} ${lastName}`;
      if(fullName && email && password){
        createUserWithEmailAndPassword(fullName, email, password)
        .then(res => {
          createUserToDb(data);
          setNewUserToggler('login');
        })
      }
  });
    return (
        <>
            <Container className="my-5" maxWidth="xs">
            <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            type="text"
                            inputRef={register({ required: true })}
                            label="First Name"
                            name="firstName"
                            size="small"
                            variant="outlined"
                            />
                            {errors.firstName && <span className="text-danger">This field is required</span>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            type="text"
                            inputRef={register({ required: true })}
                            label="Last Name"
                            name="lastName"
                            size="small"
                            variant="outlined"
                            />
                            {errors.lastName && <span className="text-danger">This field is required</span>}
                        </Grid>
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
                            inputRef={register({ required: true, minLength: 6, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/})}
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
                        Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Container>
        </>
    );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  addSignedUser : addSignedUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);