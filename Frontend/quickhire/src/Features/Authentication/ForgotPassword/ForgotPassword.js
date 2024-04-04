/**
 * @authors 
 * Rahul Hambarde
 */
import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button, makeStyles } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { Parallax } from "react-parallax";
import Background from "../../../assets/BackGround.png";
import axios from 'axios';
import { CONFIG } from '../../../config.js';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

import "./ForgotPassword.css";

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
 * Forgot password page to input a user's email for password reset link
 * @returns 
 */
const ForgotPassword = () => {
  const classes = useStyles();
  const navigate = useHistory();
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    let isValid = true;
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (isValid) {
      forgotPassword();
    }
  };

  /**
   * Send a call to backend to receive an email with password reset link
   */
  const forgotPassword = () => {
    const forgotPasswordRequest = {
      email: email,
    };
    axios.post(CONFIG.BASE_PATH + CONFIG.FORGOT_PASSWORD_PATH, forgotPasswordRequest)
    .then((response) => {
      console.log(response);
      if(response.status === 200){
        toast.success('Email sent successfully!', {
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
      if(error.response.status === 404){
          setEmailError(error.response.data.message);
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
      className='forgot-password-parallax-content'
    >
      <Paper className={classes.parentCard}>
        <Grid container className='forgot-password-content'>
          <Grid item xs={12} sm={12}>
            <Typography variant="h4" gutterBottom>
              Forgot Password
            </Typography>
            <div>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Enter your email address"
                  placeholder="Enter your email address*"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(emailError)}
                  helperText={emailError}
                />
                <Link to="/login">
                      Login instead?
                </Link>
                <Button
                  variant="contained"
                  className='forgot-password-button'
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

export default ForgotPassword;
