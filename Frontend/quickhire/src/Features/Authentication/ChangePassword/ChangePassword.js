/**
 * @authors 
 * Rahul Hambarde
 */
import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, TextField, Button, makeStyles } from "@material-ui/core";
import { useHistory, useParams } from 'react-router-dom';
import { Parallax } from "react-parallax";
import Background from "../../../assets/BackGround.png";
import axios from 'axios';
import { CONFIG } from '../../../config.js'
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from '@mui/material';

import "./ChangePassword.css";

const useStyles = makeStyles((theme) => ({
  parentCard: {
    padding: "30px",
    margin: "0%",
    borderRadius: "40px",
    backgroundColor: "rgba(255,255,255,0.87)",
    [theme.breakpoints.down("sm")]: {
      margin: "5%",
      padding: "20px",
    },
  },
}));

/**
 * Page to change a user's password
 * @returns 
 */
const ChangePassword = () => {
  const classes = useStyles();
  const navigate = useHistory();
  const { user_id, token } = useParams();
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect (
    () => {
      validateToken();
    }, []
  )

  /**
   * Validates new password and update the password
   */
  const handleSubmit = () => {
    let isValid = true;
    if (!password) {
      setPasswordError('New password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }
    //Check that the password matches our restrictions
    const passwordHasLowerCase = /[a-z]/.test(password);
    const passwordHasUpperCase = /[A-Z]/.test(password);
    const passwordHasDigit = /\d/.test(password);
    const passwordHasSpecialCharacter = /[%^=@#+$&]/.test(password);
    const passwordIsLongEnough = password?.length >= 8;

    if(!passwordHasLowerCase){
      setPasswordError("Password should contain at least 1 lowercase character.");
      isValid = false;
    }

    if(!passwordHasUpperCase){
      setPasswordError("Password should contain at least 1 uppercase character.");
      isValid = false;
    }

    if(!passwordHasDigit){
      setPasswordError("Password should contain at least 1 number.");
      isValid = false;
    }

    if(!passwordHasSpecialCharacter){
      setPasswordError("Password should contain at least 1 special character.");
      isValid = false;
    }

    if(!passwordIsLongEnough){
      setPasswordError("Password should contain at least 8 character long.");
      isValid = false;
    }

    if (isValid) {
      changePassword();
    }
  };

  /**
   * Show and hide password
   */
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Check whether a token is valid or not
   */
  const validateToken = () => {
    const url = CONFIG.BASE_PATH + CONFIG.VALIDATE_TOKEN_PATH + user_id + "/" + token;
    axios.get(url)
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      toast.error('Invalid link!');
      setTimeout(() => {
        navigate.push("/login");
      }, 1000)
    });
  }

  /**
   * Send a call to backend to change a user's password
   */
  const changePassword = () => {
    const changePasswordRequest = {
      password: password,
    };
    const url = CONFIG.BASE_PATH + CONFIG.CHANGE_PASSWORD_PATH + user_id + "/" + token;
    axios.post(url, changePasswordRequest)
    .then((response) => {
      console.log(response);
      if(response.status === 200){
        toast.success('Password changed successfully!', {
          style: {
            backgroundColor: '#49CC84',
            color: '#ffffff',
          },
        });
        setTimeout(() => {
          navigate.push("/login");
        }, 2000)
      }
    })
    .catch(function (error) {
      if(error.response.status === 400){
        setPasswordError(error.response.data.message);
      }
      else{
        console.error("Server error");
      }
    });
  }

  return (
    <Parallax
      bgImage={Background}
      strength={10}
      className='change-password-parallax-content'
    >
      <Paper className={classes.parentCard}>
        <Grid container className='change-password-content'>
          <Grid item xs={12} sm={12}>
            <Typography variant="h4" gutterBottom>
              Enter new password
            </Typography>
            <div>
              <form onSubmit={handleSubmit}>
              <TextField
                  label="New password"
                  placeholder="Password*"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value)}}
                  required
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),}}
                />
                <Button
                  variant="contained"
                  className='change-password-button'
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Parallax>
  );
}

export default ChangePassword;
