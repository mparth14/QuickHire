import React, { useState } from 'react';
import { InputLabel } from '@mui/material';
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";
import { Parallax } from "react-parallax";
import Background from "../../../assets/BackGround.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import "./Signup.css";

const useStyles = makeStyles((theme) => ({
  parentCard: {
    padding: "40px",
    margin: "15%",
    borderRadius: "40px",
    backgroundColor: "rgba(255,255,255,0.87)",
    [theme.breakpoints.down("sm")]: {
      margin: "5%",
      padding: "20px",
    },
  },
}));

const Singup = () => {
  const classes = useStyles();
  const navigate = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    document.getElementById(
      'selectedFileName',
    ).innerText = `Selected File: ${file.name}`;
  };


  const handleSubmit = () => {
    let isValid = true;

    if (!formData.first_name) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }
    if (!formData.last_name) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }
    if (!formData.email) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (!formData.password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!formData.password.confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    
     //TODO: Check password validations

    if(formData.password !== formData.confirmPassword){
      setConfirmPasswordError('Password does not match');
    }

    if (isValid) {
      navigate('/success');
    }
  };

  return (
    <Parallax
      bgImage={Background}
      strength={10}
      className='parallax-content'
    >
      <Paper className={classes.parentCard}>
        <Grid container spacing={0} className='signup-content'>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom>
              Signup
            </Typography>
            <div>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="First Name"
                  placeholder="First name*"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  error={Boolean(firstNameError)}
                  helperText={firstNameError}
                  required
                />
                <TextField
                  label="Last Name"
                  placeholder="Last name*"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  error={Boolean(lastNameError)}
                  helperText={lastNameError}
                />
                <TextField
                  label="Email"
                  placeholder="Email*"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={Boolean(emailError)}
                  helperText={emailError}
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
                <TextField
                  label="Confirm password"
                  placeholder="Confirm password*"
                  variant="outlined"
                  type="password"
                  name="confirmPassword"
                  fullWidth
                  margin="normal"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  error={Boolean(confirmPasswordError)}
                  helperText={confirmPasswordError}
                />
                <InputLabel
                  htmlFor='profilePicture'
                  sx={{ marginTop: 2, color: 'primary.secondary' }}
                >
                  Profile Picture:
                </InputLabel>
                <Button
                  component='label'
                  variant='contained'
                  startIcon={<CloudUploadIcon />}
                  htmlFor='profilePicture'
                  sx={{
                    marginBottom: 2,
                    backgroundColor: 'primary.main',
                    color: 'white',
                  }}
                >
                  Upload File
                  <input
                    id='profilePicture'
                    type='file'
                    accept="image/jpeg, image/png"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </Button>
              <div id='selectedFileName' className='selected-file'></div>
                <Button
                  variant="contained"
                  className='signup-button'
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

export default Singup;
