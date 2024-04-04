/**
 * @authors 
 * Rahul Hambarde
 */
import React, { useState, useContext } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Grid, Paper, Typography, TextField, Button, makeStyles } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { Parallax } from "react-parallax";
import Background from "../../../assets/BackGround.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { CONFIG } from '../../../config.js';
import { Link } from "react-router-dom";
import "./Login.css";

const useStyles = makeStyles((theme) => ({
  parentCard: {
    padding: "30px",
    paddingTop : "60px",
    paddingBottom : "60px",
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
 * Login page to enter a user's login details
 * @returns 
 */
const Login = () => {
  const classes = useStyles();
  const navigate = useHistory();
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  /**
   * Handle all the input changes in the form
   * @param {*} e 
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Show and hide password
   */
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Validates user details and login user
   */
  const handleSubmit = () => {
    let isValid = true;
    if (!formData.username) {
      setUserNameError('Username is required');
      isValid = false;
    } else {
      setUserNameError('');
    }
    if (!formData.password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      loginUser();
    }
  };

  /**
   * Send request to backend to validate login details and receive token
   */
  const loginUser = () => {
    const loginRequest = {
      username: formData.username,
      password: formData.password
    };
    axios.post(CONFIG.BASE_PATH + CONFIG.LOGIN_PATH, loginRequest)
    .then((response) => {
      console.log(response);
      if(response.status === 200){
        //TODO: route to home page
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        window.location.href = "/profile";
      }
    })
    .catch(function (error) {
      if(error.response.status === 404){
          setUserNameError(error.response.data.message);
      }
      else if(error.response.status === 401){
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
      className='login-parallax-content'
    >
      <Paper className={classes.parentCard}>
        <Grid container className='login-content'>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <div>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username"
                  placeholder="Username*"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={Boolean(userNameError)}
                  helperText={userNameError}
                />
                <TextField
                  label="Password"
                  placeholder="Password*"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  fullWidth
                  margin="normal"
                  value={formData.password}
                  onChange={handleChange}
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
                <div style={{display: 'flex'}}>
                  <Link to="/forgot-password">
                        Forgot password?
                  </Link>
                  <Link to="/signup" style={{marginLeft: 'auto'}}>
                        Signup instead?
                  </Link>
                </div>
                
                <Button
                  variant="contained"
                  className='login-button'
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

export default Login;
