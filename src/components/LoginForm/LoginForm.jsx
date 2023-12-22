import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './LoginForm.scss';
import { makeStyles } from '@material-ui/core/styles';
import { FiUser, FiLock } from 'react-icons/fi';
import { RiInstagramFill, RiFacebookFill, RiTwitterFill } from 'react-icons/ri';

const useStyles = makeStyles({
   inputLabel: {
      color: '#2c3359',
      fontFamily: 'Rubik',
      borderBottomColor: 'white',
      fontSize: '0.95rem',
   },
});

function LoginForm() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const classes = useStyles();

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(`Username: ${username} Password: ${password}`);
   };

   return (
      <form onSubmit={handleSubmit} className='login-form'>
         <h1>Sign in</h1>
         <div className='login-form__name'>
            <FiUser className='login-form__name--icon' />
            <TextField
               className='login-form__name--field'
               InputLabelProps={{
                  classes: {
                     root: classes.inputLabel,
                  },
               }}
               label='Username'
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
         </div>
         <div className='login-form__password'>
            <FiLock className='login-form__password--icon' />
            <TextField
               className='login-form__password--field'
               InputProps={{
                  classes: {
                     notchedOutline: classes.notchedOutline,
                  },
               }}
               InputLabelProps={{
                  classes: {
                     root: classes.inputLabel,
                  },
               }}
               label='Password'
               type='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
         </div>
         <div className='login-form__button'>
            <div className='login-form__button--login'>
               <Button
                  className='login-form__button--btn'
                  type='submit'
                  variant='contained'
                  style={{ backgroundColor: '#2b2840', color: '#fff' }}>
                  Login
               </Button>
               <p className='login-form__button--text'>Forgot your password?</p>
               <div className='login-form__social'>
                  <RiInstagramFill className='login-form__social--icon' />
                  <RiFacebookFill className='login-form__social--icon' />
                  <RiTwitterFill className='login-form__social--icon' />
               </div>
               <div className='login-form__button--signUp'>
                  <p>
                     Not a memeber yet? <span>Sign up!</span>
                  </p>
               </div>
            </div>
         </div>
      </form>
   );
}

export default LoginForm;
