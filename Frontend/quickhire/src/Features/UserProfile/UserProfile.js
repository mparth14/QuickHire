import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Container, Typography, Avatar, Grid, Paper } from '@mui/material';
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
import ToggleButton from '@mui/material/ToggleButton';
import { toast } from 'react-toastify';
import { CONFIG } from '../../config.js';
import axios from 'axios';

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
                    backgroundColor: 'rgba(52, 52, 52, 0.7)'
                }}
                sx={{"&:hover": {backgroundColor: "black"}}}
                
            >
                <AddAPhotoIcon fontSize='large'/>
            </Button>
        </div>
    );
};

const UserProfile = () => {  
  const classes = useStyles();
  const navigate = useHistory();
  const token = localStorage.getItem("token");
  const [ user, setUser ] = useState(null);
  const [ visibility, setVisibility ] = useState("invisible");
  const [ selectInfoEdit, setSelectInfoEdit] = useState(false);
  const [ selectLeftMenuEdit, setSelectLeftMenuEdit] = useState(false);

  useEffect(()=>{
    if(!token) {
        navigate.push("/login");
    }
    getUserDetails();
  }, []);

//   if (loading) {
//     return null;
//   }

    const showButton = (e) => {
        e.preventDefault();
        setVisibility("visible");
    };

    const hideButton = (e) => {
        e.preventDefault();
        setVisibility("invisible");
    };

  

  const getUserDetails = () => {
    axios.get(CONFIG.BASE_PATH + CONFIG.USER_PATH,
        {
            headers: {'Authorization': 'Bearer '+ token}
        } )
    .then((response) => {
      console.log(response);
      if(response.status === 200){
        setUser(response.data);
      }
    })
    .catch(function (error) {
        toast.error("Issue with authentication");
        setTimeout(() => {
            navigate.push("/login");
        }, 1000)
    });
  }

  return (
        <Container maxWidth="xl">
            <Paper elevation={2} sx={{ my: 4, p: 4 }} className='profile-paper'>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={3}>
                        <Avatar variant='square'onMouseEnter={(e) => showButton(e)}
                        onMouseLeave={(e) => hideButton(e)}
                            sx={{
                                backgroundColor: 'primary.main',
                                width: { xs: 110, sm: 130, md: 135, lg: 150 },
                                height: { xs: 110, sm: 130, md: 135, lg: 150 },
                                borderRadius: 2.5,
                            }}>
                            <AccountCircle className='svg_icons' fontSize="large" />
                            <EditProfilePicButton visibility={visibility}/>
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                        <Typography component="h1" variant="h2">
                            {user ? (<b>{user.first_name+ " " +user.last_name}</b>) : (<></>)}
                            <ToggleButton
                                value="check"
                                selected={selectInfoEdit}
                                sx={{border:0, marginTop: '27px', padding: 0, float: 'right'}}
                                onChange={() => {
                                    setSelectInfoEdit(!selectInfoEdit);
                                }}
                                >
                                <EditIcon fontSize='large'/>
                            </ToggleButton>
                        </Typography>
                        <Typography component="h1" variant="h6" >
                            {user? user.occupation : ""}
                        </Typography>
                        <Typography component="p" variant="body" sx={{color: "grey"}}>
                            {user? user.description : ""}
                            {/* I am a web developer and can design and develop websites for you. I have experience
                            of working as a developer for last 10 years. */}
                        </Typography>
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
                                <ToggleButton
                                    value="check"
                                    selected={selectLeftMenuEdit}
                                    sx={{border:0, marginTop: '5px', padding: 0, float: 'right'}}
                                    onChange={() => {
                                        setSelectLeftMenuEdit(!selectLeftMenuEdit);
                                    }}
                                    >
                                    <EditIcon />
                                </ToggleButton>
                            </Typography>
                            <Stack spacing={{ xs: 0.5, sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
                                {user?.skills.map(
                                    (skill) => <Chip label={skill} variant="outlined" />
                                    )
                                }
                            </Stack>
                            {!user || !(user.skills.length > 0) ? <Typography component="p" variant="body2" sx={{marginBottom: '5px', color: "grey"}}>
                                Add your skills, earn more trust!
                            </Typography> : <></>}
                        </div>
                        <Divider/>
                        {/* Education section */}
                        <div style={{marginBottom: '15px'}}>
                            <Typography component="h1" variant="h6">
                                <b>Education</b>
                            </Typography>
                            <ul>
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
                        </div>

                        <Divider/>
                        {/* Work experience section */}
                        <div style={{marginBottom: '15px'}}>
                            <Typography component="h1" variant="h6">
                                <b>Work experience</b>
                            </Typography>
                            <Typography component="p" variant="body2" sx={{marginBottom: '5px'}}>
                                {user?.experience}
                            </Typography>
                            {/* <Typography component="p" variant="body2" sx={{marginBottom: '5px', color: "grey"}}>
                                Add your experience, earn more trust!
                            </Typography> */}
                            {!user || !user.experience ? <Typography component="p" variant="body2" sx={{marginBottom: '5px', color: "grey"}}>
                            Add your experience, earn more trust!
                            </Typography> : <></>}
                        </div>
     
                        <Divider/>
                        {/* Contact me section */}
                        <div style={{marginBottom: '20px'}}>
                            <Typography component="h1" variant="h6">
                                <b>Contact me</b>
                            </Typography>
                            <Typography component="p" variant="body1" sx={{marginBottom: '5px'}}>
                                Email: <a href={"mailto:"+user?.email}>{user?.email}</a>   
                            </Typography>
                            <a href={user?.linkedInLink} target="_blank">
                                <LinkedInIcon fontSize='large'sx={{margin: '2px', marginLeft: 0, paddingLeft: 0}}/>
                            </a>
                            <a href={user?.instagramLink} target="_blank">
                                <InstagramIcon fontSize='large'sx={{margin: '2px'}}/>
                            </a>
                            <a href={user?.facebookLink} target="_blank">
                                <FacebookIcon fontSize='large'sx={{margin: '2px'}}/>
                            </a>
                        </div>
                        
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                        {/* Services section */}
                        <div>
                            <Typography component="h1" variant="h6">
                                <b>Services</b>
                            </Typography>
                            <Stack spacing={{ xs: 0.5, sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
                                <Service/>
                                <Service/>
                                <Service/>
                                <Service/>
                            </Stack>
                        </div>
                        
                    </Grid>
                </Grid>
                <Divider/>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h6">
                            <b>Reviews</b>
                        </Typography>
                    </Grid>
                    
                </Grid>
            </Paper>
        </Container>
    
  );
}

export default UserProfile;
