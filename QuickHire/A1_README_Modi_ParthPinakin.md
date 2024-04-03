# Assignment 1

- Date Created: 1 FEB 2024
- Last Modification Date: 6 FEB 2024
- Assignment URL: https://main--fabulous-babka-fd4713.netlify.app/
- Git URL: https://git.cs.dal.ca/ppmodi/csci_5709-assignments

## Authors

- [Parth Pinakin Modi](pr571545@dal.ca)

## Deployment

- npm run build - build command
- push code to github
- connect github repository with netlify site
- mention build command
- deploy

## Built With

- [React](https://vitejs.dev/guide/) - Frontend framework
- [npm](https://www.npmjs.com/) - Dependency Management

## Sources Used

### App.jsx

```
import SignUpSuccessMessage from './success-message/successMessage';
import SignUpComponent from './signup/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar/navbar';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<SignUpComponent />} />
        <Route exact path='/success' element={<SuccessWithNavbar />} />
      </Routes>
    </Router>
  );
};

const SuccessWithNavbar = () => (
  <div>
    <SignUpSuccessMessage />
  </div>
);

export default App;
```

#### In the code provided, I have used Bootstrap for designing and ensuring responsiveness. The Bootstrap library was imported into the App.jsx file, enabling the utilization of Bootstrap classes to style elements and create responsive layouts. This approach streamlines design and ensures consistency across different screen sizes through Bootstrap's responsive grid system and pre-defined CSS classes. Source - https://getbootstrap.com/docs/5.3/getting-started/introduction/

### navbar.jsx

```
import {
  Navbar,
  Nav,
  Container,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import './navbar.css';

const NavbarComponent = () => {
  return (
    <>
      <div className='container'>
        <Navbar bg='white' expand='lg' className='fixed-top'>
          <Container>
            <div className='d-flex flex-column w-100'>
              {/* First Row */}
              <div className='d-flex justify-content-between align-items-center w-100'>
                {/* Logo */}
                <Navbar.Brand as={NavLink} to='/'>
                  <img
                    src={logo}
                    height='120px'
                    className='d-inline-block align-top'
                    alt='Logo'
                  />
                </Navbar.Brand>

                {/* Search Bar */}
                <div className='search-container d-flex align-items-center'>
                  <InputGroup className='mb-6 smaller-search'>
                    <FormControl
                      placeholder='Search for services'
                      aria-label='Search'
                      aria-describedby='basic-addon2'
                    />
                  </InputGroup>
                </div>

                {/* Links */}
                <div className='d-flex'>
                  <Nav.Link as={NavLink} to='/wishlist'>
                    Wishlist
                  </Nav.Link>
                  <div className='mx-2'></div>
                  <Nav.Link as={NavLink} to='/cart'>
                    Cart
                  </Nav.Link>
                  <div className='mx-2'></div>
                  <Nav.Link as={NavLink} to='/profile'>
                    Profile
                  </Nav.Link>
                </div>
              </div>

              {/* Second Row */}
              <div className='w-100'>
                <Navbar.Toggle
                  className='ml-auto'
                  aria-controls='basic-navbar-nav'
                />
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='w-100 justify-content-center'>
                    <Nav.Link as={NavLink} to='/writing' className='mr-3'>
                      Writing
                    </Nav.Link>
                    <div className='mx-4'></div> {/* Add space between links */}
                    <Nav.Link as={NavLink} to='/programming' className='mr-3'>
                      Programming
                    </Nav.Link>
                    <div className='mx-4'></div> {/* Add space between links */}
                    <Nav.Link
                      as={NavLink}
                      to='/video-animation'
                      className='mr-3'
                    >
                      Video and Animation
                    </Nav.Link>
                    <div className='mx-4'></div> {/* Add space between links */}
                    <Nav.Link as={NavLink} to='/photography' className='mr-3'>
                      Photography
                    </Nav.Link>
                    <div className='mx-4'></div> {/* Add space between links */}
                    <Nav.Link as={NavLink} to='/others'>
                      Others
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </div>
            </div>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default NavbarComponent;
```

#### I have used React Bootstrap library to facilitate page design and responsiveness. By importing the React-Bootstrap library into the above file, I've gained access to React components styled with Bootstrap. This integration allows seamless utilization of Bootstrap's design elements within the React framework, enhancing the application's visual appeal and responsiveness.

Source: https://react-bootstrap.netlify.app/docs/getting-started/introduction

Navbar - https://react-bootstrap.netlify.app/docs/components/navbar/

Nav - https://react-bootstrap.netlify.app/docs/components/navs/#nav

Container - https://react-bootstrap.netlify.app/docs/layout/grid/#container

FormControl = https://react-bootstrap.netlify.app/docs/forms/form-control/#formcontrol

InputGroup - https://react-bootstrap.netlify.app/docs/forms/input-group/#inputgroup

### navbar.css

```
/* Update the font size of text in the Navbar by 2px */
.navbar .nav-link {
  font-size: calc(16px + 1px); /* Increase font size by 2px */
  margin-right: 10px;
}

/* Add hover effect to navbar links */
.navbar .nav-link:hover {
  color: white; /* Change text color to white on hover */
  background-color: black; /* Add black background on hover */
}

/* Make navbar links rounded */
.navbar .nav-link {
  border-radius: 20px; /* Adjust the border-radius as needed */
  padding: 10px 20px; /* Adjust padding as needed */
}

/* Add margin to the left and right sides of the navbar */
.navbar {
  width: calc(
    100% - 80px
  ); /* Subtract the margin from the width of the viewport */
  margin: 0 40px; /* Add margin from left and right */
}

/* Style the search bar */
.navbar .search-container {
  display: flex;
  justify-content: center;
  margin-top: 10px; /* Add some top margin */
}

.navbar .smaller-search .form-control {
  width: 100%; /* Take up full width */
  max-width: 400px; /* Limit maximum width of the search bar */
  border-radius: 30px; /* Make the search bar rounded */
  border: none; /* Remove the border */
  background-color: #f0f0f0; /* Set background color */
  padding: 10px 20px; /* Add padding */
}

/* Media Query for smaller screens */
@media (max-width: 768px) {
  .navbar .d-flex.flex-column.w-100 {
    align-items: center; /* Center items vertically */
  }

  .navbar .d-flex.justify-content-between.align-items-center.w-100 {
    flex-direction: column; /* Stack items vertically */
  }

  .navbar .search-container {
    margin-top: 20px; /* Adjust margin for spacing */
  }
}
```

### signup.jsx

```
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaUpload, FaTimes, FaPlus } from 'react-icons/fa';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const SignUpComponent = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fullNameError, setFullNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [primaryOccupationError, setPrimaryOccupationError] = useState('');
  const [yearsOfExperienceError, setYearsOfExperienceError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    document.getElementById(
      'selectedFileName',
    ).innerText = `Selected File: ${file.name}`;
  };

  const handleAddSkill = () => {
    const newSkill = document.getElementById('skillsInput').value.trim();
    if (newSkill !== '') {
      setSkills([...skills, newSkill]);
      document.getElementById('skillsInput').value = '';
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = () => {
    let isValid = true;

    if (!document.getElementById('fullName').value.trim()) {
      setFullNameError('Full Name is required');
      isValid = false;
    } else {
      setFullNameError('');
    }

    if (!document.getElementById('description').value.trim()) {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (!document.getElementById('primaryOccupation').value.trim()) {
      setPrimaryOccupationError('Primary Occupation is required');
      isValid = false;
    } else {
      setPrimaryOccupationError('');
    }

    if (!document.getElementById('yearsOfExperience').value.trim()) {
      setYearsOfExperienceError('Years of Experience is required');
      isValid = false;
    } else {
      setYearsOfExperienceError('');
    }

    if (isValid) {
      navigate('/success');
    }
  };

  return (
    <Container className='signup-container'>
      <div className='signup-form'>
        <h2>
          <b>Personal Information</b>
        </h2>
        <div className='form-group'>
          <label htmlFor='fullName'>Full Name</label>
          <input required type='text' className='form-control' id='fullName' />
          <div className='error'>{fullNameError}</div>
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            required
            className='form-control'
            id='description'
            rows='4'
          ></textarea>
          <div className='error'>{descriptionError}</div>
        </div>
        <div className='form-group file-input-container'>
          <label htmlFor='profilePicture'>Profile Picture:</label>
          <label className='custom-file-input'>
            <FaUpload /> Choose File
            <input
              required
              type='file'
              className='form-control-file'
              id='profilePicture'
              onChange={handleFileChange}
            />
          </label>
          <div id='selectedFileName' className='selected-file'></div>
        </div>
        <h2>
          <b>Professional Information</b>
        </h2>
        <div className='form-group'>
          <label htmlFor='primaryOccupation'>Primary Occupation</label>
          <input
            required
            type='text'
            className='form-control'
            id='primaryOccupation'
          />
          <div className='error'>{primaryOccupationError}</div>
        </div>
        <div className='form-group'>
          <label htmlFor='skills'>Skills</label>
          <div className='d-flex flex-column align-items-start'>
            <input
              required
              className='form-control mb-2'
              id='skillsInput'
              rows='3'
              placeholder='Type your skills and press Enter'
              onKeyPress={handleKeyPress}
            />
            <button
              className='btn btn-sm btn-link p-0'
              onClick={handleAddSkill}
            >
              <FaPlus style={{ fontSize: '1.5rem' }} />
            </button>
          </div>
          {skills.map((skill, index) => (
            <div key={index} className='added-skill'>
              {skill}
              <FaTimes
                className='ml-2'
                onClick={() => handleRemoveSkill(index)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
        <div className='form-group'>
          <label htmlFor='yearsOfExperience'>Years of Experience</label>
          <select required className='form-control' id='yearsOfExperience'>
            <option value='' disabled selected>
              Select one
            </option>
            <option value='none'>None or less than a year</option>
            <option value='1'>1 year</option>
            <option value='2'>2 years</option>
            <option value='3'>3 years or more</option>
          </select>
          <div className='error'>{yearsOfExperienceError}</div>
        </div>
        <div className='form-group file-input-container'>
          <label htmlFor='resume'>Resume:</label>
          <label className='custom-file-input'>
            <FaUpload /> Choose File
            <input
              required
              type='file'
              className='form-control-file'
              id='resume'
              onChange={handleFileChange}
            />
          </label>
          <div id='selectedFileName' className='selected-file'></div>
        </div>
        <button
          onClick={handleSubmit}
          type='submit'
          className='btn btn-primary'
        >
          Submit
        </button>
      </div>
    </Container>
  );
};

export default SignUpComponent;
```

#### In the SignUp.jsx file, I have integrated React-Bootstrap and React-Icons to streamline page layout and enhance visual elements. Through importing the respective libraries into SignUp.jsx, I leveraged React-Bootstrap's pre-styled components for efficient design implementation. Additionally, React-Icons provided a diverse set of scalable icons to enrich the user interface, enhancing the overall user experience within the signup process.

React-Icons - https://react-icons.github.io/react-icons/

### signup.css

```
.signup-container {
  margin: 270px auto 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.signup-form {
  width: 60%;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
}

.signup-form h2 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea.form-control {
  resize: vertical;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 12px 20px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.btn-primary:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .signup-container {
    padding: 10px;
  }
}

.file-input-container {
  position: relative;
}

/* Style for the hidden file input */
#profilePicture {
  display: none;
}

/* Style for the custom file input button */
.custom-file-input {
  display: inline-block;
  background-color: #bdd3ea;
  color: #000000;
  border: none;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
}

.custom-file-input:hover {
  background-color: #0056b3;
}

/* Style for the icon within the button */
.custom-file-input .fa {
  margin-right: 8px;
}

/* Style for the selected file name display */
.selected-file {
  margin-top: 10px;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

```

### successMessage.jsx

```
import React from 'react';
import './successMessage.css';

const SignUpSuccessMessage = () => {
  return (
    <div className='success-message-container'>
      <div className='success-message-content'>
        <p>
          You have successfully signed up as a Seller. You can go ahead and
          start adding your services.
        </p>
      </div>
    </div>
  );
};

export default SignUpSuccessMessage;
```

### successMessage.css

```
.success-message-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999; /* Ensure it's on top of other content */
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #cccccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.success-message-content {
  text-align: center;
}
```

## Acknowledgments

- The above referred external libraries offered valuable insights, laying a solid foundation for comprehending its functionality and logic. I appreciate the effort and dedication put into its creation.
- Additionally, the code's clarity and well-documented structure contributed significantly to my learning process, making it more accessible and beneficial for further exploration.
