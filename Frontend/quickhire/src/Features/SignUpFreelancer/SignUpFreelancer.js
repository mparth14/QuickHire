/**
 * Author: Parth Modi
 *
 * Component for registering as a freelancer.
 * This component allows users to register as freelancers by providing professional information.
 */

import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Typography, Select, MenuItem, InputLabel } from '@mui/material';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { CONFIG } from '../../config.js';

const SignUpFreelancer = ({ user, onload }) => {
  const navigate = useHistory();
  const [skills, setSkills] = useState([]);
  const [primaryOccupationError, setPrimaryOccupationError] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [yearsOfExperienceError, setYearsOfExperienceError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    if (!user && onload) {
      navigate.push('/login');
    }
  }, [onload, user, navigate]);

  if (!user) {
    return null;
  }

  // const handleResumeFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const allowedFormats = [
  //     'application/pdf',
  //     'application/msword',
  //     'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //   ];

  //   if (file && allowedFormats.includes(file.type)) {
  //     setSelectedResumeFile(file);
  //     document.getElementById(
  //       'selectedResumeFileName',
  //     ).innerText = `Selected Resume: ${file.name}`;
  //   } else {
  //     // Reset the selected file and display an error message
  //     setSelectedResumeFile(null);
  //     const errorText = document.getElementById('selectedResumeFileName');
  //     errorText.innerText = 'Please select a valid file (PDF, DOC, or DOCX).';
  //     errorText.style.color = 'red'; // Applying inline CSS for red color
  //   }
  // };

  /**
   * Adds a skill to the skills array.
   */
  const handleAddSkill = () => {
    const newSkill = document.getElementById('skillsInput').value.trim();
    if (newSkill !== '') {
      setSkills([...skills, newSkill]);
      document.getElementById('skillsInput').value = '';
    }
  };

  /**
   * Removes a skill from the skills array.
   *
   * @param {number} index - The index of the skill to be removed.
   */
  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  /**
   * Handles key press events, specifically for adding a skill when Enter key is pressed.
   *
   * @param {object} event - The key press event object.
   */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddSkill();
    }
  };

  // const convertFileToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result); // Return full Base64 string
  //     reader.onerror = (error) => reject(error);
  //   });
  // };

  /**
   * Handles form submission.
   */
  const handleSubmit = async () => {
    let isValid = true;

    // Validate form fields
    const primaryOccupation = document
      .getElementById('primaryOccupation')
      .value.trim();

    if (!primaryOccupation) {
      setPrimaryOccupationError('Primary Occupation is required');
      isValid = false;
    } else {
      setPrimaryOccupationError('');
    }

    if (!yearsOfExperience) {
      setYearsOfExperienceError('Years of Experience is required');
      isValid = false;
    } else {
      setYearsOfExperienceError('');
    }

    // // convert resume to base64
    // const resumeFile = selectedResumeFile;
    // const resumef = resumeFile ? await convertFileToBase64(resumeFile) : null;
    const occupation = primaryOccupation;
    const experience = yearsOfExperience;
    const isFreelancer = true;
    if (isValid) {
      const formData = {
        isFreelancer,
        occupation,
        skills,
        experience,
      };

      try {
        const response = await fetch(CONFIG.BASE_PATH + 'user/' + user._id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          navigate.push('/profile');
        } else {
          console.error('Failed to update user profile');
        }
      } catch (error) {
        console.error('Error creating freelancer:', error);
      }
    }
  };

  return (
    <Container maxWidth='md' sx={{ paddingY: 4 }}>
      <div>
        <Typography
          variant='h3'
          align='center'
          color='primary'
          gutterBottom
          style={{
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bolder',
            letterSpacing: '1px',
            marginBottom: '30px',
          }}
        >
          Register as a Freelancer
        </Typography>

        <Typography variant='h5' gutterBottom color='primary'>
          Professional Information
        </Typography>
        <TextField
          required
          fullWidth
          label='Primary Occupation'
          id='primaryOccupation'
          error={Boolean(primaryOccupationError)}
          helperText={primaryOccupationError}
          margin='normal'
        />
        <div>
          <Typography variant='h5' gutterBottom color='primary'>
            Skills
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              required
              id='skillsInput'
              label='Type your skills and press Enter'
              onKeyPress={handleKeyPress}
              margin='normal'
            />
            <IconButton onClick={handleAddSkill}>
              <FaPlus />
            </IconButton>
          </div>
          {skills.map((skill, index) => (
            <div
              key={index}
              style={{ display: 'flex', alignItems: 'center', marginTop: 1 }}
            >
              {skill}
              <IconButton onClick={() => handleRemoveSkill(index)}>
                <FaTimes style={{ cursor: 'pointer' }} />
              </IconButton>
            </div>
          ))}
        </div>
        <div>
          <InputLabel
            htmlFor='yearsOfExperience'
            sx={{ marginTop: 2, color: 'primary.main' }}
          >
            <Typography variant='h5' color='primary'>
              {' '}
              Years of Experience
            </Typography>
          </InputLabel>
          <Select
            required
            fullWidth
            label='Years of Experience'
            id='yearsOfExperience'
            defaultValue=''
            value={yearsOfExperience}
            onChange={(event) => setYearsOfExperience(event.target.value)}
            error={Boolean(yearsOfExperienceError)}
            margin='normal'
          >
            <MenuItem value='' disabled>
              Select one
            </MenuItem>
            <MenuItem value='None or less than a year'>
              None or less than a year
            </MenuItem>
            <MenuItem value='1 year'>1 year</MenuItem>
            <MenuItem value='2 years'>2 years</MenuItem>
            <MenuItem value='3 years or more'>3 years or more</MenuItem>
          </Select>
          {yearsOfExperienceError && (
            <Typography variant='caption' color='error' sx={{ marginTop: 1 }}>
              {yearsOfExperienceError}
            </Typography>
          )}
        </div>
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
};

export default SignUpFreelancer;
