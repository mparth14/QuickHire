/**
 * @Author Angel Christian
 * ServiceCreationPage Component
 * 
 * Component for adding a new service by a user.
 * 
 * @param {object} user - The user object containing information about the logged-in user.
 * @param {boolean} onload - Flag indicating whether the component is loaded.
 * @returns {JSX.Element} ServiceCreationPage component JSX
 */
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";
import { imageStorage }  from "../../../utils/firebaseConfig.js";
import { AuthContext } from '../../AuthContext.js';
import { useHistory } from 'react-router-dom';
import { CONFIG } from '../../../config.js';


const useStyles = makeStyles((theme) => ({
  focusedInput: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3f51b5"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#3f51b5"
    },
    "&.MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#3f51b5"
      }
    },
    "& .MuiSelect-root.Mui-focused": {
      backgroundColor: "transparent",
    },
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
  },
});


const ServiceCreationPage = ({ user, onload }) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const { loading} = useContext(AuthContext);
  const [token, setToken] = useState('');
  const navigate = useHistory();



  const uploadImageToFirebase = async (image) => {
    const imageUUID = v4();
    const imageRef = ref(imageStorage, `files/${imageUUID}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(ref(imageStorage, `files/${imageUUID}`));
    return imageURL;
  };

  useEffect(( ) =>{
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    if(!user && onload){
        navigate.push("/login");
    }
    if(user && onload && !user.isFreelancer){
      navigate.push("/profile");
  }
  }, [onload, user,navigate])

  

  useEffect(() => {
    // Fetch categories from the API
    fetch(`${CONFIG.BASE_PATH}categories`)
      .then(response => response.json())
      .then(({ data }) => {
        setCategoryOptions(data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    const categoryData = categoryOptions.find(cat => cat.name === selectedCategory);
    if (categoryData) {
      setSubcategoryOptions(categoryData.subcategories);
    } else {
      console.error(`Subcategories for ${selectedCategory} not found.`);
    }

    setSubcategory('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate all required fields
    const title = event.target.elements.title.value;
    const price = event.target.elements.price.value;
    const description = event.target.elements.description.value;

    if (!title || !price || !category || !subcategory || !description || !selectedFile) {
      // Show a warning toast if any required field is missing
      toast.warning('Please fill in all required fields and upload an image.');
      return;
    }
    if (price < 20 || price > 100) {
      toast.warning('Price must be between $20 and $100.');
      return;
    }

    // Validate description length
    if (description.length < 120) {
      // Show a warning toast for minimum character count
      toast.warning('Description should be a minimum of 120 characters.');
      return;
    }
    
    try {
      const profilePictureURL = await uploadImageToFirebase(selectedFile);

      const response = await fetch(`${CONFIG.BASE_PATH}services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` ,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          subCategory: subcategory,
          price: parseFloat(price),
          sellerId: user._id, 
          imgUrl: profilePictureURL,
          sellerName:`${user.first_name} ${user.last_name}`,
          jobTitle: user.occupation
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success('Service Created Successfully!');

        // Reset form fields
        event.target.reset();
        setSelectedFile(null);
        setCategory('');
        setSubcategory('');
        navigate.push('/service-manage')
      } else {
        toast.error('Error creating service. Please try again.');
      }
    } catch (error) {
      console.error('Error creating service:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Validate the file type (allow only images)
    if (file && file.type.includes('image')) {
      setSelectedFile(file);
    } else {
      // Display an error message or reset the file input
      toast.warning('Invalid file type. Please select an image.');
      event.target.value = null;
    }
  };
  if (!user || loading) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%' }}>
          <Container maxWidth="md" style={{ backgroundColor: 'white', padding: 20, borderRadius: 8 }}>
            <Typography  variant="h4" align="center" gutterBottom>
              Add New Service
            </Typography>
            <form id='creationForm' onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField name="title" label="Title" fullWidth required className={classes.focusedInput} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="price" label="Price($/hr)" type="number" fullWidth required className={classes.focusedInput} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.focusedInput}
                    value={category}
                    name='Category'
                    onChange={handleCategoryChange}
                    variant="outlined"
                    label="Category"
                    fullWidth
                    select
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categoryOptions.map((category) => (
                      <MenuItem key={category._id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.focusedInput}
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    variant="outlined"
                    label="Subcategory"
                    name='Subcategory'
                    fullWidth
                    select
                    disabled={!category}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {subcategoryOptions.map((subcategory) => (
                      <MenuItem key={subcategory._id} value={subcategory.name}>
                       
                       {subcategory.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    className={classes.focusedInput}
                    inputProps={{ minLength: 120 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Typography variant="body2" style={{ marginBottom: 8 }}>
                      Upload Banner Image*:
                    </Typography>
                    <Button component="span" variant="outlined" fullWidth>
                      {selectedFile ? selectedFile.name : 'Choose Image'}
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    style={{ color: 'white', backgroundColor: '#3f51b5' }}
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ServiceCreationPage;
