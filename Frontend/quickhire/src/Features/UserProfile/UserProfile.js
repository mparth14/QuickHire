/**
 * @authors 
 * Rahul Hambarde
 */

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { DialogTitle, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Container, Typography, Avatar, Grid, Paper, TextField, ToggleButton, Select, MenuItem, InputLabel, DialogActions  } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import "./UserProfile.css";
import Divider from '@mui/material/Divider';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Service from './Services/Service.js'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";
import { toast } from 'react-toastify';
import { CONFIG } from '../../config.js';
import { FaTimes, FaPlus } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import { v4 } from "uuid";
import { imageStorage }  from "../../utils/firebaseConfig.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Dialog from '@mui/material/Dialog';
const useStyles = makeStyles((theme) => ({
    parentCard: {
      backgroundColor: "rgba(255,255,255,0.87)",
    }
}));


const EditProfilePicButton = ({ visibility }) => {
    return (
        <div className={visibility}>
            <Button
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    backgroundColor: 'rgba(52, 52, 52, 0.4)'
                }}
                
            >
                <AddAPhotoIcon fontSize='large'/>
            </Button>
        </div>
    );
};

const UserProfile = ({user, onload, onUserUpdate}) => {  
    const classes = useStyles();
    const navigate = useHistory();
    const { loading} = useContext(AuthContext);
    const [ visibility, setVisibility ] = useState("invisible");
    const [ selectInfoEdit, setSelectInfoEdit] = useState(false);
    const [ selectLeftMenuEdit, setSelectLeftMenuEdit] = useState(false);
    const [ firstNameError, setFirstNameError] = useState("");
    const [ lastNameError, setLastNameError] = useState("");
    const [ deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
    const storedToken = localStorage.getItem("token");
    const inputFile = useRef(null) 

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        occupation: "",
        description: "",
        skills: [],
        education: [],
        experience: "",
        linkedInLink: "",
        instagramLink: "",
        facebookLink: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    useEffect(() =>{
        if(!user && onload){
            navigate.push("/login");
        }
        if(user && onload){
            setFormData(user);
        }
    }, [onload, user])

    useEffect(()=>{
        const getUserDetails = () => {
            axios
              .get(CONFIG.BASE_PATH + CONFIG.USER_PATH, {
                headers: { Authorization: "Bearer " + storedToken },
              })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  setFormData(response.data);
                }
              })
              .catch(function (error) {
                toast.error("Issue with authentication");
              });
          };
          getUserDetails();
    }, [])

    if (!user || loading) {
        return null;
    }

    const showButton = (e) => {
        e.preventDefault();
        setVisibility("visible");
    };

    const hideButton = (e) => {
        e.preventDefault();
        setVisibility("invisible");
    };

    const signupFreelancer = () => {
        navigate.push("/register-freelancer");
    }

    const handleAddSkill = () => {
        const newSkill = document.getElementById('skillsInput').value.trim();
        if (newSkill !== '') {
            const skillArr = [...formData.skills, newSkill];
            setFormData({
                ...formData,
                "skills": skillArr,
            });
            document.getElementById('skillsInput').value = '';
        }
      };
    
    const handleRemoveSkill = (index) => {
        const updatedSkills = [...formData.skills];
        updatedSkills.splice(index, 1);
        setFormData({
            ...formData,
            "skills": updatedSkills,
        });
      };
    
      const handleAddEducation = () => {
        const newEducation = document.getElementById('educationInput').value.trim();
        if (newEducation !== '') {
            const educationArr = [...formData.education, newEducation];
            console.log(formData.education);
            setFormData({
                ...formData,
                "education": educationArr,
            });
            document.getElementById('educationInput').value = '';
        }
      };
    
    const handleRemoveEducation = (index) => {
        const updatedEducation = [...formData.education];
        updatedEducation.splice(index, 1);
        setFormData({
            ...formData,
            "education": updatedEducation,
        });
      };

    const handleSkillKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleAddSkill();
        }
      };
    
    const handleEducationKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleAddEducation();
        }
      };

    const onProfileButtonClick = () => {
        inputFile.current.click();
      };

    const handleProfileFileChange = async(event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            const profilePictureUrl = await uploadImageToFirebase(file);
            const oldProfilePicture = formData.profilePictureUrl;
            setFormData({
                ...formData,
                "profilePictureUrl": profilePictureUrl,
            });
            updateProfilePicture(profilePictureUrl, oldProfilePicture);
        }
    }

    const uploadImageToFirebase = async (image) => {
        const imageUUID = v4();
        const imageRef = ref(imageStorage, `files/${imageUUID}`);
        await uploadBytes(imageRef, image);
        const imageURL = await getDownloadURL(
          ref(imageStorage, `files/${imageUUID}`)
        );
        return imageURL;
      };

    const convertLink = link => {
        if(link){
            return link.startsWith("http://") || link.startsWith("https://") ?
          link
          : `http://${link}`;
        }
      };

    const updateUserDetails = () => {
        let isValid = true;
        if (!formData.first_name || formData.first_name.length <= 0) {
            setFirstNameError('First name is required');
            isValid = false;
          } else {
            setFirstNameError('');
        }

        if (!formData.last_name || formData.last_name.length <= 0) {
            setLastNameError('Last name is required');
            isValid = false;
          } else {
            setLastNameError('');
        }

        if(!isValid){
            return;
        }
      
        const newFormData = {...formData};
        delete newFormData.password;
        setFormData(newFormData);
        onUserUpdate(newFormData);

        setSelectInfoEdit(false);
        setSelectLeftMenuEdit(false);
        axios.post(CONFIG.BASE_PATH + CONFIG.USER_PATH + user._id, newFormData,
            {
                headers: {'Authorization': 'Bearer '+ storedToken }
            } )
        .then((response) => {
          console.log(response);
          if(response.status === 200){
            toast.success("Profile details updated succesfully");
          }
        })
        .catch(function (error) {
            toast.error("Issue while saving user details");
            setSelectInfoEdit(false);
            setSelectLeftMenuEdit(false);
        });
      }

    const clearUserInfoForm = () => {
        setFirstNameError('');
        setLastNameError('');
        setSelectInfoEdit(!selectInfoEdit);
        setFormData(user);
      }
    const updateProfilePicture = (profilePictureUrl, oldProfilePicture) => {
        const newFormData = {...formData};
        delete newFormData.password;
        setFormData(newFormData);
        onUserUpdate(newFormData);

        axios.post(CONFIG.BASE_PATH + CONFIG.USER_PATH + user._id, 
            {...newFormData,
            "profilePictureUrl": profilePictureUrl},
            {
                headers: {'Authorization': 'Bearer '+ storedToken }
            } )
        .then((response) => {
          console.log(response);
          if(response.status === 200){
            console.log("Saved")
            toast.success("Profile picture updated succesfully");
          }
        })
        .catch(function (error) {
            toast.error("Issue while updating profile picture");
            setFormData({
                ...formData,
                "profilePictureUrl": oldProfilePicture,
            });
            onUserUpdate(formData);
        });
      }

    const deleteUserAccount = () => {
        setDeleteAccountDialogOpen(true);
    }

    const confirmDeleteAccount = () => {
        axios.delete(CONFIG.BASE_PATH + CONFIG.USER_PATH + user._id,
            {
                headers: {'Authorization': 'Bearer '+ storedToken }
            })
        .then((response) => {
          console.log(response);
          if(response.status === 200){
            // console.log("Account deleted successfully")
            toast.success("Account deleted succesfully");
            if(localStorage.getItem("token")){
                localStorage.removeItem("token");
            }
            setTimeout(()=>{
                window.location.href = "/";
            }, 2000)
            
          }
        })
        .catch(function (error) {
            toast.error("Issue while deleting user account");
        });
        setDeleteAccountDialogOpen(false);
      }

    const closeDeleteAccountDialog = () => {
        setDeleteAccountDialogOpen(false);
      }

  return (
        <Container maxWidth="xl">
            <Paper elevation={2} sx={{ my: 4, p: 4 }} className='profile-paper'>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={3}>
                        <Avatar variant='square' onMouseEnter={(e) => showButton(e)}
                            onMouseLeave={(e) => hideButton(e)}
                            onClick={onProfileButtonClick}
                            sx={{
                                backgroundColor: '#1F91CC',
                                width: { xs: 110, sm: 130, md: 135, lg: 150 },
                                height: { xs: 110, sm: 130, md: 135, lg: 150 },
                                borderRadius: 2.5,
                            }}
                            >
                            {formData.profilePictureUrl && formData.profilePictureUrl !== "" ?
                                <img src={formData?.profilePictureUrl} 
                                className="profile-picture"/>
                                :
                                <AccountCircle className='svg_icons' fontSize="large" />}
                            
                            <EditProfilePicButton visibility={visibility}/>
                            <input
                                id='profilePicture'
                                type='file'
                                style={{ display: 'none' }}
                                ref={inputFile}
                                onChange={handleProfileFileChange}
                                accept='.jpg,.jpeg,.png'
                            />

                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                        <Typography component="h1" sx={{ typography: { sm: 'h2', xs: 'h3' } }}>
                            {!selectInfoEdit && user ? (<b>{user.first_name+ " " +user.last_name}</b>) : (<></>)}
                            {!selectInfoEdit ?
                            <ToggleButton
                                value="check"
                                selected={selectInfoEdit}
                                sx={{border:0, marginTop: {xs: '12px', sm: '27px'}, padding: 0, float: 'right'}}
                                onChange={() => {
                                    setSelectInfoEdit(!selectInfoEdit);
                                    setSelectLeftMenuEdit(false);
                                }}
                                >
                                <EditIcon fontSize='large'/>
                            </ToggleButton>
                            :
                            <>
                                <ToggleButton value="check"
                                        sx={{border:0, marginTop: '27px', marginLeft: 2, padding: 0, float: 'right'}}
                                        selected={!selectInfoEdit}
                                        onChange={() => clearUserInfoForm()}>
                                        <ClearIcon fontSize='large'/>
                                </ToggleButton>
                                <ToggleButton value="check"
                                    sx={{border:0, marginTop: '27px', padding: 0, float: 'right'}}
                                    selected={!selectInfoEdit}
                                    onChange={() => updateUserDetails()}>
                                    <SaveIcon fontSize='large'/>
                                </ToggleButton>
                                
                            </>
                            }
                        </Typography>
                        {selectInfoEdit ?
                        <>
                            <TextField label='First name' id='first_name' 
                                placeholder="Your occupation" required
                                name="first_name" onChange={handleChange} 
                                value={formData.first_name} 
                                error={Boolean(firstNameError)}
                                helperText={firstNameError}
                                size='small'
                                sx={{margin: '5px', marginLeft: 0}} style={{marginRight: '20px'}}
                                /> 
                        
                            <TextField label='Last name' id='last_name' 
                                placeholder="Your occupation" required
                                name="last_name" onChange={handleChange} 
                                value={formData.last_name}
                                error={Boolean(lastNameError)}
                                helperText={lastNameError}
                                size='small'
                                sx={{margin: '5px', marginLeft: 0}}
                                /> <br/>
                        </> : <></>}
                        {!selectInfoEdit ?
                        <Typography component="h1" variant="h6" >
                            {user? user.occupation : ""}
                        </Typography> 
                        :
                        <TextField label='Your occupation' id='occupation' 
                            placeholder="Your occupation"
                            name="occupation" onChange={handleChange} 
                            value={formData.occupation} 
                            sx={{margin: '5px', marginLeft: 0}} size='small'
                            />
                        }
                        {!selectInfoEdit ?
                        <Typography component="p" variant="body" sx={{color: "grey"}}>
                            {user? user.description : ""}
                            {/* I am a web developer and can design and develop websites for you. I have experience
                            of working as a developer for last 10 years. */}
                        </Typography>
                        :
                        <TextField fullWidth label='Your professional description'
                            id='description' placeholder="Your desciption"
                            name="description" onChange={handleChange} multiline maxRows={5}
                            value={formData.description} 
                            sx={{margin: '5px', marginLeft: 0}} size='small'/>
                        }
                        <br/>
                        {/* <Divider/> */}
                    </Grid>
                </Grid>
                <br/>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={3}>
                        <div style={{marginBottom: '15px'}}>
                            {/* Skills section */}
                            <Typography component="h1" variant="h6" sx={{marginBottom: '5px'}}>
                                <b>Skills</b>
                                {!selectLeftMenuEdit ?
                                <ToggleButton
                                    value="check"
                                    selected={selectLeftMenuEdit}
                                    sx={{border:0, marginTop: '5px', padding: 0, float: 'right'}}
                                    onChange={() => {
                                        setSelectLeftMenuEdit(!selectLeftMenuEdit);
                                        setSelectInfoEdit(false);
                                    }}
                                    >
                                    <EditIcon/>
                                </ToggleButton>
                                :
                                <>
                                    <ToggleButton value="check"
                                            sx={{border:0, marginTop: '5px', marginLeft: 2, padding: 0, float: 'right'}}
                                            selected={!selectLeftMenuEdit}
                                            onChange={() => {
                                                setSelectLeftMenuEdit(!selectLeftMenuEdit);
                                                setFormData(user);
                                                }}>
                                            <ClearIcon/>
                                    </ToggleButton>
                                    <ToggleButton value="check"
                                        sx={{border:0, marginTop: '5px', padding: 0, float: 'right'}}
                                        selected={!selectLeftMenuEdit}
                                        onChange={() => updateUserDetails()}>
                                        <SaveIcon/>
                                    </ToggleButton>
                                    
                                </>
                                }
                            </Typography>
                            {!selectLeftMenuEdit ?
                            <><Stack spacing={{ xs: 0.5, sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
                                {user?.skills.map(
                                    (skill) => <Chip label={skill} variant="outlined" />
                                    )
                                }
                            </Stack>
                            {!user || !(user.skills.length > 0) ? <Typography component="p" variant="body2" sx={{marginBottom: '5px', color: "grey"}}>
                                Add your skills, earn more trust!
                            </Typography> : <></>}
                            </> :
                            <><div style={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                id='skillsInput'
                                onKeyPress={handleSkillKeyPress}
                                sx={{margin: '5px', marginLeft: 0}}
                                label='Skills'
                                placeholder="Your skills"
                                name="skills" size='small'
                                />
                                <IconButton onClick={handleAddSkill}>
                                    <FaPlus />
                                </IconButton>
                            </div>
                            {formData?.skills.map((skill, index) => (
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
                            </>}
                            </div>
                        <Divider/>
                        {/* Education section */}
                        <div style={{marginBottom: '15px'}}>
                            <Typography component="h1" variant="h6">
                                <b>Education</b>
                            </Typography>
                            {!selectLeftMenuEdit ?
                            <><ul>
                                {user?.education.map(
                                    (edu, i) => {
                                        return (
                                        <li key={user._id + edu}>
                                            <Typography component="p" variant="body2" sx={{marginBottom: '5px'}}>
                                                {edu}
                                            </Typography>
                                        </li>)
                                    }
                                    )
                                }
                            </ul>
                            {!user || !(user.education.length > 0) ? <Typography component="p" variant="body2" sx={{marginBottom: '5px', color: "grey"}}>
                            Add your education, earn more trust!
                            </Typography> : <></>}
                            </> :
                            <><div style={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                id='educationInput'
                                onKeyPress={handleEducationKeyPress}
                                sx={{margin: '5px', marginLeft: 0}}
                                label='Education'
                                placeholder="Your education"
                                name="education" size='small'
                                />
                                <IconButton onClick={handleAddEducation}>
                                    <FaPlus />
                                </IconButton>
                            </div>
                            {formData?.education.map((edu, index) => (
                                <div
                                key={index}
                                style={{ display: 'flex', alignItems: 'center', marginTop: 1 }}
                                >
                                {edu}
                                <IconButton onClick={() => handleRemoveEducation(index)}>
                                    <FaTimes style={{ cursor: 'pointer' }} />
                                </IconButton>
                                </div>
                            ))}
                            </> }
                        </div>

                        <Divider/>
                        {/* Work experience section */}
                        <div style={{marginBottom: '15px'}}>
                            <Typography component="h1" variant="h6">
                                <b>Work experience</b>
                            </Typography>
                            {!selectLeftMenuEdit ?
                            <>
                                <Typography component="p" variant="body2" sx={{marginBottom: '5px'}}>
                                    {user?.experience}
                                </Typography>
                                {!user || !user.experience ? <Typography component="p" variant="body2" sx={{marginBottom: '5px', color: "grey"}}>
                                Add your experience, earn more trust!
                                </Typography> : <></>}
                            </>
                            :
                            <>
                                <Select
                                    required
                                    label="Years of Experience"
                                    placeholder="Years of Experience"
                                    id='yearsOfExperience'
                                    name='experience'
                                    value={formData.experience}
                                    onChange={handleChange}
                                    sx={{margin: '5px', marginLeft: 0}}
                                    size='small'
                                >
                                    <MenuItem value='' disabled>
                                    Select one
                                    </MenuItem>
                                    <MenuItem value='none'>None or less than a year</MenuItem>
                                    <MenuItem value='1 year'>1 year</MenuItem>
                                    <MenuItem value='2 years'>2 years</MenuItem>
                                    <MenuItem value='3 years or more'>3 years or more</MenuItem>
                                </Select>
                            </>}
                        </div>
     
                        <Divider/>
                        {/* Contact me section */}
                        <div style={{marginBottom: '15px'}}>
                            <Typography component="h1" variant="h6">
                                <b>Contact me</b>
                            </Typography>
                            <Typography component="p" variant="body2" sx={{marginBottom: '5px'}}>
                                Email: <a href={"mailto:"+user?.email} style={{display: 'contents', wordWrap: 'break-word'}}>{user?.email}</a>   
                            </Typography>
                            {!selectLeftMenuEdit ?
                            <>
                                {user?.linkedInLink ?
                                <a href={convertLink(user?.linkedInLink)} target="_blank">
                                    <LinkedInIcon fontSize='large'sx={{margin: '2px', marginLeft: 0, paddingLeft: 0}}/>
                                </a>: <></>}
                                {user?.instagramLink ?
                                <a href={convertLink(user?.instagramLink)} target="_blank">
                                    <InstagramIcon fontSize='large'sx={{margin: '2px'}}/>
                                </a>: <></>}
                                {user?.facebookLink ?
                                <a href={convertLink(user?.facebookLink)} target="_blank">
                                    <FacebookIcon fontSize='large'sx={{margin: '2px'}}/>
                                </a> : <></>}
                            </>
                            :
                            <>
                            <TextField label='LinkedIn url' id='linkedInLink' 
                                placeholder="LinkedIn url"
                                name="linkedInLink" onChange={handleChange} 
                                size='small'
                                value={formData.linkedInLink} 
                                sx={{margin: '5px', marginLeft: 0}}
                                />
                            <TextField label='Instagram url' id='instagramLink' 
                                placeholder="Instagram url"
                                size='small'
                                name="instagramLink" onChange={handleChange} 
                                value={formData.instagramLink} 
                                sx={{margin: '5px', marginLeft: 0}}
                                />
                            <TextField label='Facebook url' id='facebookLink' 
                                placeholder="Facebook url"
                                size='small'
                                name="facebookLink" onChange={handleChange} 
                                value={formData.facebookLink} 
                                sx={{margin: '5px', marginLeft: 0}}
                                />
                            </>}
                        </div>
                        <Divider/>
                        
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                        {/* Services section */}
                        {formData?.isFreelancer ?
                        <div>
                                  {/* Heading for services */}
                                  <div>
                                      <Typography component="h1" variant="h6">
                                          <b>Services</b>
                                      </Typography>
                                  </div>
                                    
                                  {/* Container to center the buttons */}
                                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                      {/* Add Service button */}
                                      <Button
                                          variant="contained"
                                          style={{ backgroundColor: '#1F91CC', color: '#fff', marginRight: 10 }}
                                          onClick={() => navigate.push('/service-creation')}
                                      >
                                          <span role="img" aria-label="add-service" style={{ fontSize: 30, color: '#ffffff' }}>➕</span> Add Service
                                      </Button>

                                      {/* Manage Service button */}
                                      <Button
                                          variant="contained"
                                          style={{ backgroundColor: '#1F91CC', color: '#fff' }}
                                          onClick={() => navigate.push('/service-manage')}
                                      >
                                          <span role="img" aria-label="manage-service" style={{ fontSize: 30, color: '#ffffff' }}>🛠️</span> Manage Service
                                      </Button>
                                  </div>
                        </div> : 
                        <div>
                            <Paper elevation={2} sx={{ mb: 4, p: 4,
                                minHeight: "250px", alignItems: 'center', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography component="h1" sx={{ typography: { sm: 'h4', xs: 'h5' } }}>
                                    Want to get hired?
                                </Typography>
                                <Button onClick={signupFreelancer} sx={{size: {sm: 'large', xs: 'medium'}}} variant='contained' style={{ backgroundColor: '#1F91CC', color: '#fff', marginTop: 20 }}>
                                    Become a freelancer
                                </Button>
                            </Paper>   
                        </div>}
                        
                    </Grid>
                </Grid>
                {/* Danger section */}
                <Typography component="h1" variant="h6">
                    <b>Danger section</b>
                </Typography>
                <Button variant="outlined" 
                    style={{ color: '#fc2403', borderColor: '#fc2403', marginTop: 5 }}
                    onClick={deleteUserAccount}>
                    Delete account
                </Button>
                {/* Delete account alert */}
                <Dialog
                    open={deleteAccountDialogOpen}
                    onClose={closeDeleteAccountDialog}>
                    <DialogTitle>
                        {"Delete user acccount?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button style={{ color: '#fc2403'}} onClick={confirmDeleteAccount}>
                            Delete
                        </Button>
                        <Button autoFocus onClick={closeDeleteAccountDialog}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
  );
}

export default UserProfile;
