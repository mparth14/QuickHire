import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    TextField,
    MenuItem,
    Button,
    Grid,
    Box,
    Modal,
    Tabs,
    Tab,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CardActionArea,
    CardMedia,
    Tooltip,

} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import { green } from '@material-ui/core/colors';
import { Close, Edit, Block } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { imageStorage } from '../../../utils/firebaseConfig.js';

const useStyles = makeStyles((theme) => ({
    focusedInput: {
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1f91cc',
        },
        '& .MuiInputLabel-outlined.Mui-focused': {
            color: '#1f91cc',
        },
        '&.MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#1f91cc',
            },
        },
        '& .MuiSelect-root.Mui-focused': {
            backgroundColor: 'transparent',
        },
    },
    card: {
        maxWidth: 500,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    media: {
        height: 140,
        width: '100%',
        objectFit: 'cover',
    },
    cardContent: {
        flex: '1',
        padding: `${theme.spacing(2)}px !important`,
        display: 'flex',
        flexDirection: 'column',
    },
    cardTitle: {
        flex: '0 0 auto',
        marginBottom: theme.spacing(1),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    cardDescription: {
        flex: '1',
        marginBottom: theme.spacing(1),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    cardActions: {
        marginTop: 'auto',
        justifyContent: 'flex-end',
    },
}));

const theme = createTheme({
    palette: {
        primary: {
            main: '#1f91cc',
        },
        secondary: {
            main: '#ff0000',
        },
    },
});

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};
const cardsPerPage = 16;

const ManageService = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState(null);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [wholeCategoryOptions, setWholeCategoryOptions] = useState([]);
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [services, setServices] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedService, setEditedService] = useState({});
    const [confirmDisableDialogOpen, setConfirmDisableDialogOpen] = useState(false);
    const [disableServiceId, setDisableServiceId] = useState('');
    const fileInputRef = useRef(null);
    const [confirmEnableDialogOpen, setConfirmEnableDialogOpen] = useState(false);
    const [enableServiceId, setEnableServiceId] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    // Function to upload image to Firebase
    const uploadImageToFirebase = async (image) => {
        const imageUUID = v4();
        const imageRef = ref(imageStorage, `files/${imageUUID}`);
        await uploadBytes(imageRef, image);
        const imageURL = await getDownloadURL(ref(imageStorage, `files/${imageUUID}`));
        return imageURL;
    };

    // Function to handle enabling service
    const handleEnableService = (serviceId) => {
        setEnableServiceId(serviceId);
        setConfirmEnableDialogOpen(true);
    };

    // Function to fetch categories from API
    const fetchCategories = () => {
        fetch('http://localhost:4000/api/v1/categories')
            .then((response) => response.json())
            .then(({ data }) => {
                setWholeCategoryOptions(data);
                const categories = data.map((category) => category.name);
                setCategoryOptions(categories);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    };

    // Function to fetch services from API
    const fetchServices = () => {
        fetch('http://localhost:4000/api/v1/services')
            .then((response) => response.json())
            .then(({ data }) => {
                setServices(data);
            })
            .catch((error) => console.error('Error fetching services:', error));
    };

    useEffect(() => {
        fetchCategories();
        fetchServices();
    }, []);

    // Function to handle category change
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);

        const selectedCategoryObject = wholeCategoryOptions.find((cat) => cat.name === selectedCategory);
        if (selectedCategoryObject) {
            const subcategoryNames = selectedCategoryObject.subcategories.map(subcategory => subcategory.name);
            setSubcategoryOptions(subcategoryNames || []);
        } else {
            console.error(`Category ${selectedCategory} not found.`);
        }

        setSubcategory('');
    };

    // Function to handle tab change
    const handleTabChange = (event, newValue) => {
        setActiveTabIndex(newValue);
        setCurrentPage(1);
    };

    // Function to handle editing service
    const handleEditService = (service) => {
        setEditedService(service);
        if (service) {
            setCategory(service.category)
            setSubcategory(service.subCategory)
            const selectedCategoryObject = wholeCategoryOptions.find((cat) => cat.name === service.category);
            const subcategoryNames = selectedCategoryObject.subcategories.map(subcategory => subcategory.name);
            setSubcategoryOptions(subcategoryNames || []);
        }
        setEditModalOpen(true);
    };

    // Function to handle disabling service
    const handleDisableService = (serviceId) => {
        setDisableServiceId(serviceId);
        setConfirmDisableDialogOpen(true);
    };

    // Function to confirm disabling service
    const handleConfirmDisableService = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/services/${disableServiceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isActive: false,
                }),
            });
            if (response.ok) {
                toast.success('Service disabled successfully.');
                setConfirmDisableDialogOpen(false);
                fetchServices();
            } else {
                toast.error('Error disabling service. Please try again.');
            }
        } catch (error) {
            console.error('Error disabling service:', error);
            toast.error('An unexpected error occurred. Please try again later.');
        }
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const title = event.target.elements.title.value;
        const price = event.target.elements.price.value;
        const description = event.target.elements.description.value;
        const category = event.target.elements.Category.value;
        const subcategory = event.target.elements.Subcategory.value;

        if (!title || !price || !category || !subcategory || !description || !editedService.imgUrl) {
            toast.warning('Please fill in all required fields and upload an image.');
            return;
        }

        if (description.length < 120) {
            toast.warning('Description should be a minimum of 120 characters.');
            return;
        }

        try {
            let profilePictureURL
            if (!selectedFile) {
                profilePictureURL = editedService.imgUrl
            } else {
                profilePictureURL = await uploadImageToFirebase(selectedFile);
            }

            const response = await fetch(`http://localhost:4000/api/v1/services/${editedService._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    category,
                    subCategory: subcategory,
                    price: parseFloat(price),
                    sellerId: '1',
                    imgUrl: profilePictureURL,
                }),
            });
            if (response.ok) {
                setEditModalOpen(false)
                toast.success('Service Updated Successfully!');
                event.target.reset();
                setSelectedFile(null);
                setCategory('');
                setSubcategory('');
                fetchServices();
            } else {
                toast.error('Error updating service. Please try again.');
            }
        } catch (error) {
            console.error('Error updating service:', error);
            toast.error('An unexpected error occurred. Please try again later.');
        }
    };

    // Function to handle file change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.includes('image')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setEditedService(prevState => ({
                    ...prevState,
                    imgUrl: reader.result
                }));
            };
        } else {
            if (!editedService.imgUrl) {
                setSelectedFile(null);
                setEditedService(prevState => ({ ...prevState, imgUrl: '' }));
                toast.warning('Invalid file type. Please select an image.');
            } else {
                setSelectedFile(null);
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        }
    };

    const handleConfirmEnableService = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/services/${enableServiceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isActive: true,
                }),
            });
            if (response.ok) {
                toast.success('Service enabled successfully.');
                fetchServices();
            } else {
                toast.error('Error enabling service. Please try again.');
            }
        } catch (error) {
            console.error('Error enabling service:', error);
            toast.error('An unexpected error occurred. Please try again later.');
        } finally {
            setConfirmEnableDialogOpen(false);
        }
    };
    const showActivePagination = services.filter((service) => service.isActive).length > cardsPerPage;
    const showDisabledPagination = services.filter((service) => !service.isActive).length > cardsPerPage;

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl" style={{ minHeight: '100vh' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Service Management
                </Typography>
                <Box mb={4}>
                    <Tabs
                        value={activeTabIndex}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Active Services" />
                        <Tab label="Disabled Services" />
                    </Tabs>
                </Box>
                <TabPanel value={activeTabIndex} index={0} >
                    {services.filter((service) => service.isActive).length === 0 ? (
                        <Typography variant="h5" align="center" style={{ marginTop: '20px' }} gutterBottom>
                            No services to show
                        </Typography>
                    ) : (
                        <Grid container spacing={3} >
                            {services
                                .filter((service) => service.isActive)
                                .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
                                .map((service) => (
                                    <Grid item xs={12} sm={6} md={3} key={service._id}>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                {service.imgUrl ? <CardMedia
                                                    className={classes.media}
                                                    image={service.imgUrl}
                                                    title={service.title}
                                                />
                                                    :
                                                    <CardMedia
                                                        className={classes.media}
                                                        image="https://firebasestorage.googleapis.com/v0/b/quickhire-d317e.appspot.com/o/images%2Fplaceholder.png?alt=media&token=07b5ea18-a770-44e2-8745-8e7239f25b50"
                                                        title="Placeholder Image"
                                                    />}
                                                <CardContent className={classes.cardContent}>
                                                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                                                        {service.title.length > 20 ? `${service.title.substring(0, 20)}...` : service.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Category:</strong> {service.category} <br />
                                                        <strong>Subcategory:</strong> {service.subCategory}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="p"
                                                        className={classes.cardDescription}
                                                        style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 3,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxHeight: '4.6em',
                                                        }}
                                                    >
                                                        {service.description}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions className={classes.cardActions}>
                                                <Typography variant="body2" color="textSecondary" component="p" style={{ marginRight: 'auto' }}>
                                                    ${service.price.toFixed(2)} per hour
                                                </Typography>
                                                <Tooltip title="Edit Service">
                                                    <IconButton onClick={() => handleEditService(service)}>
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Disable Service">
                                                    <IconButton onClick={() => handleDisableService(service._id)}>
                                                        <Block color="secondary" />
                                                    </IconButton>
                                                </Tooltip>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}

                        </Grid>


                    )}
                    {showActivePagination && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <div>
                                <Pagination
                                    count={Math.ceil(services.filter((service) => service.isActive).length / cardsPerPage)}
                                    color="primary"
                                    onChange={handlePageChange}
                                />
                            </div>
                        </div>)}

                </TabPanel>
                <TabPanel value={activeTabIndex} index={1}>
                    {services.filter((service) => !service.isActive).length === 0 ? (
                        <Typography variant="h5" align="center" style={{ marginTop: '20px' }} gutterBottom>
                            No services to show
                        </Typography>
                    ) : (
                        <Grid container spacing={3}>
                            {services
                                .filter((service) => !service.isActive)
                                .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
                                .map((service) => (
                                    <Grid item xs={12} sm={6} md={3} key={service._id}>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                {service.imgUrl ? (
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={service.imgUrl}
                                                        title={service.title}
                                                    />
                                                ) : (
                                                    <CardMedia
                                                        className={classes.media}
                                                        image="https://firebasestorage.googleapis.com/v0/b/quickhire-d317e.appspot.com/o/images%2Fplaceholder.png?alt=media&token=07b5ea18-a770-44e2-8745-8e7239f25b50"
                                                        title="Placeholder Image"
                                                    />
                                                )}
                                                <CardContent className={classes.cardContent}>
                                                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                                                        {service.title.length > 20 ? `${service.title.substring(0, 20)}...` : service.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cardDescription}>
                                                        {service.description.length > 100 ? `${service.description.substring(0, 100)}...` : service.description}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions className={classes.cardActions}>
                                                <Tooltip title="Enable Service">
                                                    <IconButton onClick={() => handleEnableService(service._id)}>
                                                        <VisibilityIcon style={{ color: green[500] }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}

                        </Grid>
                    )}
                    {showDisabledPagination && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <div>

                                <Pagination
                                    count={Math.ceil(services.filter((service) => !service.isActive).length / cardsPerPage)}
                                    color="primary"
                                    onChange={handlePageChange}
                                />
                            </div>
                        </div>
                    )}
                </TabPanel>

                <Modal
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Box style={{ backgroundColor: 'white', boxShadow: theme.shadows[5], padding: theme.spacing(2), maxWidth: 600, width: '100%', borderRadius: 8 }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing(2) }}>
                            <Typography variant="h5">Edit Service</Typography>
                            <IconButton onClick={() => setEditModalOpen(false)}>
                                <Close />
                            </IconButton>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="title"
                                        label="Title"
                                        fullWidth
                                        required
                                        defaultValue={editedService.title}
                                        className={classes.focusedInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="price"
                                        label="Price($)"
                                        type="number"
                                        fullWidth
                                        required
                                        defaultValue={editedService.price}
                                        className={classes.focusedInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={classes.focusedInput}
                                        value={category}
                                        name="Category"
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
                                        name="Subcategory"
                                        fullWidth
                                        select
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
                                        defaultValue={editedService.description}
                                        className={classes.focusedInput}
                                        inputProps={{ minLength: 120 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <input
                                        accept="image/*"
                                        id="contained-button-file"
                                        type="file"
                                        ref={fileInputRef}
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
                                    {editedService.imgUrl && (
                                        <>
                                            <Box mt={2}>
                                                <Typography variant="body2">Current Image:</Typography>
                                                <img src={editedService.imgUrl} alt="Current Service Image" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '8px' }} />
                                            </Box>
                                            <Button variant="outlined" color="secondary" onClick={() => {
                                                setSelectedFile(null);
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = null;
                                                }
                                                setEditedService(prevState => ({ ...prevState, imgUrl: '' }))
                                            }}>
                                                Remove Image
                                            </Button>
                                        </>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        style={{ color: 'white', backgroundColor: '#1f91cc' }}
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Modal>

                {/* Confirmation Dialogs */}
                <Dialog open={confirmDisableDialogOpen} onClose={() => setConfirmDisableDialogOpen(false)}>
                    <DialogTitle>Confirm Disable Service</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">
                            Are you sure you want to disable this service?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmDisableDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmDisableService} color="secondary">
                            Disable
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={confirmEnableDialogOpen} onClose={() => setConfirmEnableDialogOpen(false)}>
                    <DialogTitle>Confirm Enable Service</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">
                            Are you sure you want to enable this service?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmEnableDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmEnableService} color="secondary">
                            Enable
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
};

export default ManageService;
