import React, { useState, useEffect } from 'react';
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
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";
import { imageStorage }  from "../../../utils/firebaseConfig.js";

const useStyles = makeStyles((theme) => ({
  focusedInput: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1f91cc"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#1f91cc"
    },
    "&.MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#1f91cc"
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
      main: '#1f91cc',
    },
  },
});

const ServiceCreationPage = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [wholeCategoryOptions, setWholeCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

   const uploadImageToFirebase = async (image) => {
    const imageUUID = v4();
    const imageRef = ref(imageStorage, `files/${imageUUID}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(
      ref(imageStorage, `files/${imageUUID}`)
    );
    return imageURL;
  };

  useEffect(() => {
    // Fetch categories from the API
    fetch('http://localhost:4000/api/v1/categories')
      .then(response => response.json())
      .then(({ data }) => {
        setCategoryOptions(data.map(category => category.name));
        setWholeCategoryOptions(data)
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    const selectedCategoryObject = categoryOptions.find(cat => cat === selectedCategory);
    if (selectedCategoryObject) {
      const categoryData = wholeCategoryOptions.find(cat => cat.name === selectedCategory);
      if (categoryData) {
        setSubcategoryOptions(categoryData.subcategories);
      } else {
        console.error(`Subcategories for ${selectedCategory} not found.`);
      }
    } else {
      console.error(`Category ${selectedCategory} not found.`);
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
    const profilePictureURL = await uploadImageToFirebase(selectedFile);

    try{
      const profilePictureURL = await uploadImageToFirebase(selectedFile);

    const response = await fetch('http://localhost:4000/api/v1/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        category,
        subCategory: subcategory,
        price: parseFloat(price),
        sellerId: '1', // Hardcoded for testing
        imgUrl: profilePictureURL,
      }),
    });

    const responseData = await response.json();
    console.log("responseData",responseData);

    if (response.ok) {
      toast.success('Service Created Successfully!', {
        style: {
          backgroundColor: '#5DA3A0',
          color: '#ffffff',
        },
      });

      // Reset form fields
      event.target.reset();
      setSelectedFile(null);
      setCategory('');
      setSubcategory('');
  
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

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: '#f7f7f7', height: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%' }}>
          <Container maxWidth="md" style={{ backgroundColor: 'white', padding: 20, borderRadius: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
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
                    {categoryOptions.map((category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
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
                    {subcategoryOptions.map((subcategory, index) => (
                      <MenuItem key={index} value={subcategory}>
                        {subcategory}
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
                    style={{ color: 'white', backgroundColor: '#1f91cc' }}
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

