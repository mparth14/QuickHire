/**
 * @authors
 * Rahul Hambarde
 */
import React, { useState, useContext } from "react";
import { InputLabel, IconButton, InputAdornment } from "@mui/material";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useHistory } from "react-router-dom";
import { Parallax } from "react-parallax";
import Background from "../../../assets/BackGround.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { CONFIG } from "../../../config.js";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";

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

/**
 * Signup page to register a new user
 * @returns
 */
const Singup = () => {
  const classes = useStyles();
  const navigate = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
   * Validates all the input and submit the form
   */
  const handleSubmit = () => {
    let isValid = true;

    //Check if all the fields are empty
    if (!formData.first_name) {
      setFirstNameError("First name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }
    if (!formData.last_name) {
      setLastNameError("Last name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }
    if (!formData.username) {
      setUserNameError("Username is required");
      isValid = false;
    } else {
      setUserNameError("");
    }
    if (!formData.email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!formData.password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    //Check that the password matches our restrictions
    const passwordHasLowerCase = /[a-z]/.test(formData.password);
    const passwordHasUpperCase = /[A-Z]/.test(formData.password);
    const passwordHasDigit = /\d/.test(formData.password);
    const passwordHasSpecialCharacter = /[%^=@#+$&]/.test(formData.password);
    const passwordIsLongEnough = formData.password?.length >= 8;

    if (!passwordHasLowerCase) {
      setPasswordError(
        "Password should contain at least 1 lowercase character."
      );
      isValid = false;
    }

    if (!passwordHasUpperCase) {
      setPasswordError(
        "Password should contain at least 1 uppercase character."
      );
      isValid = false;
    }

    if (!passwordHasDigit) {
      setPasswordError("Password should contain at least 1 number.");
      isValid = false;
    }

    if (!passwordHasSpecialCharacter) {
      setPasswordError("Password should contain at least 1 special character.");
      isValid = false;
    }

    if (!passwordIsLongEnough) {
      setPasswordError("Password should contain at least 8 character long.");
      isValid = false;
    }

    //Check that confirm password is present and matches with password
    if (!formData.confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (formData.password !== formData.confirmPassword) {
      isValid = false;
      setConfirmPasswordError("Password does not match");
    }

    //Everything is valid, signup the user
    if (isValid) {
      signupUser();
    }
  };

  /**
   * Send a request to backend to register a new user
   */
  const signupUser = () => {
    const signupRequest = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      profilePictureUrl: "",
    };
    axios
      .post(CONFIG.BASE_PATH + CONFIG.SIGNUP_PATH, signupRequest)
      .then((response) => {
        console.log(response);
        if (response.status == 200 || response.status === 201) {
          //TODO: route to home page
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          window.location.href = "/profile";
        }
      })
      .catch(function (error) {
        if (error.response.status == 409) {
          if (error.response.data.message == "Email already registered") {
            setEmailError(error.response.data.message);
          }
          if (error.response.data.message == "Username already exists") {
            setUserNameError(error.response.data.message);
          }
        } else {
          console.error("Server error");
        }
      });
  };

  return (
    <Parallax
      bgImage={Background}
      strength={10}
      className="signup-parallax-content">
      <Paper className={classes.parentCard}>
        <Grid container className="signup-content">
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
                          edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                <Link to="/login">Login instead?</Link>
                <Button
                  variant="contained"
                  className="signup-button"
                  onClick={handleSubmit}>
                  Submit
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Parallax>
  );
};

export default Singup;
