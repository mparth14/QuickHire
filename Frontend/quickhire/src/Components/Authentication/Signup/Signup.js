import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Typography, Select, MenuItem, InputLabel } from '@mui/material';
import { FaTimes, FaPlus } from 'react-icons/fa';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useHistory } from 'react-router-dom';

const Singup = () => {
  const navigate = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    document.getElementById(
      'selectedFileName',
    ).innerText = `Selected File: ${file.name}`;
  };


  const handleSubmit = () => {
    let isValid = true;

    if (!document.getElementById('firstName').value.trim()) {
      setFirstNameError('First Name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!document.getElementById('lastName').value.trim()) {
      setLastNameError('Last Name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (!document.getElementById('email').value.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!document.getElementById('password').value.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!document.getElementById('confirmPassword').value.trim()) {
      setConfirmPasswordError('Confirm password is required');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      navigate('/success');
    }
  };

  return (
    <Container maxWidth='xs' sx={{ paddingY: 4 }}>
      <div>
        <Typography textAlign={'center'} variant='h4' gutterBottom color='primary'>
          Signup
        </Typography>
        <TextField required
          fullWidth
          label='First Name'
          id='firstName'
          placeholder='Enter your first name'
          error={Boolean(firstNameError)}
          helperText={firstNameError}
          margin='normal'
        />
        <TextField required
          fullWidth
          label='Last Name'
          id='lastName'
          placeholder='Enter your last name'
          error={Boolean(lastNameError)}
          helperText={lastNameError}
          margin='normal'
        />
        <TextField
          id='email'
          fullWidth
          label='Email'
          placeholder='Enter your email'
          required
          error={Boolean(emailError)}
          helperText={emailError}
          margin='normal'
        />
        <TextField
          id='password'
          fullWidth
          label='Password'
          placeholder='Enter your password'
          required
          type="password"
          error={Boolean(passwordError)}
          helperText={passwordError}
          margin='normal'
        />
        <TextField
          id='confirmPassword'
          fullWidth
          label='ConfirmPassword'
          placeholder='Confim your password'
          required
          type="password"
          error={Boolean(confirmPasswordError)}
          helperText={confirmPasswordError}
          margin='normal'
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
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Button>
        <div id='selectedFileName' className='selected-file'></div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button onClick={handleSubmit} variant='contained' color='success'>
            Submit
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Singup;
