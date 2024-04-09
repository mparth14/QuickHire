# QuickHire

QuickHire is like an online marketplace where people can offer their skills and services for others to hire or buy. Building an app or a website or even helping a person in developing something for your needs, QuickHire is the ideal platform for everyone.


* *Date Created*: 29 Jan 2024
* *Last Modification Date*: Apr 9, 2024
* *Frontend Deployed URL*: <https://quick-hire.netlify.app/>
* *Backend Deployed URL*: <https://quickhire-backend-1.onrender.com/>
* *Group Gitlab URL*: <https://git.cs.dal.ca/gupta2/csci_5709_grp-04/>

Note: Please give 50 seconds to 2 minutes to UI for loading data. As backend is hosted on Render as free tier, and it will take sometime to start.

## Authors

- [Hiteshkumar Gupta](ht643276@dal.ca) - _(Frontend, Backend Developer)_
- [Rahul Hambarde](rahul.hambarde@dal.ca) - _(Frontend, Backend Developer)_
- [Parth Pinakin Modi](pr571545@dal.ca) - _(Frontend, Backend Developer)_
- [Angel Christian](an321060@dal.ca) - _(Frontend, Backend Developer)_
- [Tijilkumar Parmar](tj950701@dal.ca) - _(Frontend, Backend Developer)_
- [Yashkumar Khorja](ys944579@dal.ca) - _(Frontend, Backend Developer)_

# Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
  - [Frontend](#frontend)
- [Getting Started - Frontend](#getting-started---frontend)
  - [Sources Used](#sources-used---frontend)
- [Acknowledgments](#acknowledgments)
- [References](#references)


## Features

1. **Product Wishlist Page**
2. **Search Result Page**
   - Services List
   - Sort options
3. **Individual Service Page**
   - Service Details
   - Add to Wishlist
   - Send Message
4. **Feedback and Rating System**
   - Both ways
5. **User Management**
   - Login Page
   - Sign up page
   - User Profile Page
     - Reviews as well
6. **Payment Gateway for Service**
   - Payment Processing on the individual service screen
7. **Become A Seller Setup**
   - Multiple pages, similar to Fiverr
8. **Service Creation Page for Seller**
9. **Wishlist for the User, My Services for the Seller**
    - View
    - Edit
    - Disable
10. **Subcategory Service Page**
    - When clicked on a broader category
11. **Orders Page**

## SEO, robots.txt and sitemap.xml
- QuickHire's SEO improve for search engine visibility.
- Included a robots.txt file to control search engine bot access to the site.
- Added a sitemap.xml file to aid search engine crawling and indexing.


## Project Structure
### Frontend
In our frontend implementation, we have adopted a feature-based organization structure:

- **Features Folder**: Contains subfolders for each feature of the application.
  - Within each feature folder:
    - **Components**: Individual components related to that feature.
    - **CSS Files**: Each component has its own CSS file, allowing for easier management of styles.

## Getting Started - Frontend
### Prerequisites

To have a local copy of this lab up and running on your local machine, you will first need to install the following libraries and tools:

```
git
node: v14.21.3
npm: v6.14.18
react: ^17.0.1
```

To have a local copy of this assingnment up and running on your local machine, you will first need to install the following software:

Download Install node from node website
```
Website: https://nodejs.org/en/download
```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone repository
```
git clone https://git.cs.dal.ca/gupta2/csci_5709_grp-04.git
```

Change directory to app
```
cd csci_5709_grp-04
cd Frontend
cd quickhire
```
Install packages
```
npm i
```
Create .env file add following credentials
```
REACT_APP_BACKEND_URL=https://quickhire-backend-1.onrender.com/api/v1/
REACT_APP_FIREBASE_API = AIzaSyAeyFuIDm34sjFU0_yGgMTJmpyJTCmoE5k
```
Run Project
```
npm start
```
Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Deployment

To deploy on ubuntu server, follow this steps:
Clone repository
```
git clone https://git.cs.dal.ca/gupta2/csci_5709_grp-04.git
```

Change directory to app
```
cd csci_5709_grp-04
cd Frontend
cd quickhire
```
Install packages
```
npm i
```
Create .env file add following credentia;s
```
REACT_APP_BACKEND_URL=https://quickhire-backend-1.onrender.com/api/v1/
REACT_APP_FIREBASE_API = AIzaSyAeyFuIDm34sjFU0_yGgMTJmpyJTCmoE5k
```
Build Project
```
npm run build
```
This will regenerate build folder which will contains index.html.

Point `nginx` server to this location.

Your server will be up and running.

## Built With

* [React](http://www.dropwizard.io/1.0.2/docs/) - The web library used
* [Material UI](https://v4.mui.com/getting-started/installation/) - Styling library
* [FlatIcon](https://www.flaticon.com/) - For icons
* [Stripe](https://stripe.com/) - Online payment processing platform


## Sources Used - Frontend

### Navbar.js

*Lines 1 - 235*

```js
import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import './Navbar.css'
import logo from "../../assets/logo-white.png"
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  let isMobile = false;
  if(window.screen.width <= 800){
    isMobile = true;
  }
  console.log(window.screen.width);
  console.log(isMobile)

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={"grow"}>
      <AppBar className='border-status' position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
          </IconButton>
          {!isMobile && <Link to="/"><img src={logo} className='image-css' alt='Logo'/></Link>}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search here ..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={"grow"} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

```

The code above was created by adapting the code in [MUI](https://v4.mui.com/components/app-bar/) as shown below: 

```js
import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}


```

- The code in [NAME](link) was implemented by MUI
- [MUI](https://v4.mui.com/components/app-bar/)'s Code was used because it has dynamic, responsive and well maintained code for navbar. As for this assignment, my task was to create a category and sub category page, therfore I focused on more on that pages.
- [MUI](https://v4.mui.com/components/app-bar/)'s Code was modified by adding adding variables which makes it more responsive such as `isMobile` variable. 

### CategoryCard.js, SubServiceCard.js

CaregoryCard: *Lines 65 - 93* <br>
SubServiceCard: *Lines 23 - 39*
```js
# CategoryCard.js
return (
    <div className='card-design'>
      {cardData.map((data, index) => (
        <Link to="/subcategory" className="link-deco">
        <Card key={index} className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={"media"}
              image={data.image}
              title={data.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {data.title}
              </Typography>
              <Typography>
                <ul>
                  {data.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Link>
      ))}
    </div>
  );

  # SubCategoryCard.js
  return (
    <div className='sub-card-design'>
      {cardData.map((data, index) => (
        <Card key={index} className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={"media"}
              image={data.image}
            />
            <CardContent>
              <InfoCard cardInfo={data} />
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
```

The code above was created by adapting the code in [MUI](https://v4.mui.com/components/cards/) as shown below: 

```js
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
```

- The code in [MUI](https://v4.mui.com/components/cards/) was implemented by Material UI
- [MUI](https://v4.mui.com/components/cards/)'s Code was used because I need a structure for the card for which I can modify it. Hence, I took the reference from this and modified according to my need.
- [MUI](https://v4.mui.com/components/cards/)'s Code was modified by making it dynamic, iterating it with multiple values.

### SubPagination.js
SubPagination.js: *Lines 1 - 24*
```js
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationOutlined() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={10} variant="outlined" />
      <Pagination count={10} variant="outlined" color="primary" />
      <Pagination count={10} variant="outlined" color="secondary" />
      <Pagination count={10} variant="outlined" disabled />
    </div>
  );
}
```

The code above was created by adapting the code in [MUI](https://mui.com/material-ui/react-pagination/) as shown below: 

```js
  import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    marginTop: "20px",
    marginBottom: "20px"
  },
}));

export default function PaginationOutlined() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={10} variant="outlined" color="primary" />
    </div>
  );
}

```

- The code in [MUI](https://v4.mui.com/components/cards/) was implemented by Material UI
- [MUI](https://v4.mui.com/components/cards/)'s Code was used because this is pagination component which is not main focus for this assignmenet. Hence, I have used MUI's pagination components.
- [MUI](https://v4.mui.com/components/cards/)'s Code was modified by removing extra paginations contents and keeping only one pagination part. 

### Signup.js

_Line 47_
``` js
const [showPassword, setShowPassword] = useState(false)
```
_Lines 73 - 75_
``` js
const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
};
```
_Lines 270 - 295_
``` js
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
```

### Login.js

_Line 42_
``` js
const [showPassword, setShowPassword] = useState(false)
```
_Lines 64 - 66_
``` js
const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
};
```
_Lines 149 - 174_
``` js
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
```

The code in both of the above files (Signup.js and Login.js) was created by adapting the code in [Medium.com - How I Created Toggle Password Visibility with Material UI](https://medium.com/@sumsourabh14/how-i-created-toggle-password-visibility-with-material-ui-b3fb975b5ce4) as shown below:

``` js
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const PasswordInput = ({ password, handlePassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      size="small"
      type={showPassword ? "text" : "password"}
      label="Password"
      value={password}
      onChange={handlePassword}
      required={true}
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
        ),
      }}
      fullWidth
    />
  );
};

export default PasswordInput;

```
- The code in [Medium.com - How I Created Toggle Password Visibility with Material UI](https://medium.com/@sumsourabh14/how-i-created-toggle-password-visibility-with-material-ui-b3fb975b5ce4)'s was implemented by modifying the existing code in our project and using the code provided from the source to suit an extra requirement- showing and hiding password on signup page.
- [Medium.com - How I Created Toggle Password Visibility with Material UI](https://medium.com/@sumsourabh14/how-i-created-toggle-password-visibility-with-material-ui-b3fb975b5ce4)'s code was used because it contains MUI which was our main styling framework. I tried other sources but they were complicated increasing lines of code. I found that this source's code was very small compared to what I was building so I used it.
- [Medium.com - How I Created Toggle Password Visibility with Material UI](https://medium.com/@sumsourabh14/how-i-created-toggle-password-visibility-with-material-ui-b3fb975b5ce4)'s code was modified by just adding extra state like showPassword in our component and using the source provided according to the requirements of the module.

### AuthContext.js

_Lines 3 - 19_
``` js
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        setLoading(false);
    }, []);

    return(
        <AuthContext.Provider value={{token, setToken, loading}}>
            {children}
        </AuthContext.Provider>
    );
}
```

The above code was created by adapting the code in [Medium.com - How to Implement a Secure JWT Authentication and Registration with React and Node.js](https://medium.com/@simonsruggi/how-to-implement-jwt-authentication-with-react-and-node-js-5d8bf3e718d0) as shown below:

``` js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false); 
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

```
- The code in [Medium.com - How to Implement a Secure JWT Authentication and Registration with React and Node.js](https://medium.com/@simonsruggi/how-to-implement-jwt-authentication-with-react-and-node-js-5d8bf3e718d0)'s was implemented by understanding how to use AuthContext and local stoage from frontend
- [Medium.com - How to Implement a Secure JWT Authentication and Registration with React and Node.js](https://medium.com/@simonsruggi/how-to-implement-jwt-authentication-with-react-and-node-js-5d8bf3e718d0)'s code was used because it was easy starting to learn how to use AuthContext and local storage.
- [Medium.com - How to Implement a Secure JWT Authentication and Registration with React and Node.js](https://medium.com/@simonsruggi/how-to-implement-jwt-authentication-with-react-and-node-js-5d8bf3e718d0)'s code was used without modifying because it was very generic and small code which did not need any direct changes and it fit into our project directly.


### UserProfile.js

*Lines 11 - 55*

``` js
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

```

The code above was created by adapting the code in [Stackoverflow.com-How place a button at the center of the image on hover with Material UI (MUI) and reacts?](https://stackoverflow.com/questions/73641843/how-place-a-button-at-the-center-of-the-image-on-hover-with-material-ui-mui-an) as shown below: 

``` js
import React, { useState } from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const Butt = ({ display }) => {
  return (
    <div className={display}>
      <Button
        style={{
          position: "absolute",
          top: "80%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        variant="contained"
      >
        Get a Free Quote
      </Button>
    </div>
  );
};

export default function App() {
  const [display, setDisplay] = useState("notdisplayed");
  const showButton = (e) => {
    e.preventDefault();
    setDisplay("displayed");
  };

  const hideButton = (e) => {
    e.preventDefault();
    setDisplay("notdisplayed");
  };
  return (
    <Box p={5}>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} md={4} sm={6}>
          <Card
            sx={{ minWidth: 200 }}
            style={{ position: "relative", width: "100%" }}
          >
            <div
              onMouseEnter={(e) => showButton(e)}
              onMouseLeave={(e) => hideButton(e)}
            >
              <CardMedia
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  height: "auto",
                  zIndex: "1",
                }}
                component="img"
                height="200"
                image="https://st.depositphotos.com/1001894/3115/i/600/depositphotos_31157709-stock-photo-hassan-ii-mosque-in-casablanca.jpg"
                alt="work portfolio"
              />
              <Butt display={display} />
            </div>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

```

- The code in [Stackoverflow.com-How place a button at the center of the image on hover with Material UI (MUI) and reacts?](https://stackoverflow.com/questions/73641843/how-place-a-button-at-the-center-of-the-image-on-hover-with-material-ui-mui-an) was implemented by understanding the properties required to make an item lay over another item using CSS and MUI
- [Stackoverflow.com-How place a button at the center of the image on hover with Material UI (MUI) and reacts?](https://stackoverflow.com/questions/73641843/how-place-a-button-at-the-center-of-the-image-on-hover-with-material-ui-mui-an)'s Code was used because it was good starting point in understanding styling properties like position and transform.
- [Stackoverflow.com-How place a button at the center of the image on hover with Material UI (MUI) and reacts?](https://stackoverflow.com/questions/73641843/how-place-a-button-at-the-center-of-the-image-on-hover-with-material-ui-mui-an)'s Code was modified by understanding what each property does and changing it according to project requirements.

### Wishlist.js

_Lines 147 - 152_

```js
<Pagination
  className="pagination-bar"
  currentPage={currentPage}
  totalCount={data.length}
  pageSize={PageSize}
  onPageChange={(page) => setCurrentPage(page)}
/>
```

The code above was created by adapting the code in [How to Build a Custom Pagination Component in React](https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/) as shown below:

```js
<SubPagination
  itemsPerPage={itemsPerPage}
  totalItems={services.length}
  paginate={paginate}
/>
```

- The code in [How to Build a Custom Pagination Component in React](https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/) was written by Shubham Khatri.
- [How to Build a Custom Pagination Component in React](https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/)'s Code was used because I needed to implement a pagination logic in a visually appealing manner.
- [How to Build a Custom Pagination Component in React](https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/)'s Code was modified by me by altering the components originally used by the author. I made the changes to match my file names as well as to adjust it's functionality tailored to our applications use case.


### Orders.js

_Lines 1 - 63_

``` js
import React, { useState } from "react";
import NavBar from "../utilities/NavBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box } from "@material-ui/core";
import OrdersView from "./OrdersView";
import SubHeader from "../utilities/SubHeader";

function Orders() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ padding: "0 2rem" }}>
      <NavBar />
      <SubHeader />
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered>
        <Tab
          label="Service Placed"
          id="full-width-tab-0"
          aria-controls="full-width-tabpanel-0"
        />
        <Tab
          label="Service Received"
          id="full-width-tab-1"
          aria-controls="full-width-tabpanel-1"
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <OrdersView />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrdersView received={true} />
      </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ backgroundColor: "#e0e0e0" }}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default Orders;

```

The code above was created by adapting the code in [Tabs - Official Material UI Components](https://v4.mui.com/components/tabs/) as shown below:

``` js
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
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
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
```

- [Tabs - Official Material UI Components](https://v4.mui.com/components/tabs/)'s code was used because this is the view I had imagined my Service Orders Page would look like. It was my belief that incorporating well-implemented code from external sources would expedite the development process and help me achieve the desired functionality and efficiency.
- [Tabs - Official Material UI Components](https://v4.mui.com/components/tabs/)'s code was modified by altering it according to the need of component with major changes in code like adjusting variable names and integrating it with other components. Also the content was modified based on requirement of the module.

## References
Images used for the cards in the projects (they are cited in project readme file as well):
```
1. Creative IT Institute. [Hair Treatment Course Image]. [Online]. Available. https://www.creativeitinstitute.com/images/course/course_1663052056.jpg [Accessed On: Feb 6, 2024]

2. Dribbble. Hair Treatment App. [Online]. Available. https://dribbble.com/shots/19606563-Hair-Treatment-App [Accessed On: Feb 6, 2024]

3. Dribbble. Infinite Software. [Online]. Available. https://dribbble.com/shots/3812899-Infinite-Software/attachments/10034607?mode=media [Accessed On: Feb 6, 2024]

4. Dribbble. Skype Universal Windows App. [Online]. Available. https://dribbble.com/shots/2652326-Skype-Universal-Windows-App/attachments/9414061?mode=media [Accessed On: Feb 6, 2024]

5. Fotor. Profile Picture Ideas. [Online]. Available. https://www.fotor.com/blog/profile-picture-ideas/ [Accessed On: Feb 6, 2024]

6. Fiverr. "Fiverr - Freelance Services Marketplace", 2024. [Online]. Available: https://www.fiverr.com/ [Accessed on: February 6, 2024]

7. Upwork. "Upwork - The World's Work Marketplace, 2024" [Online]. Available: https://www.upwork.com/ [Accessed on: February 6, 2024]

8. Material UI. "Overview." [Online]. Available: [https://mui.com/material-ui/getting-started/](https://mui.com/material-ui/getting-started/) Accessed February 21, 2024.

9. “Diary free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/diary_10748360?term=writing&page=1&position=90&origin=search&related_id=10748360. [Accessed On: Feb 27, 2024].

10. “Code free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/code_1903572?term=programming&related_id=1903572. [Accessed On: Feb 27, 2024].

11. “Diary free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/diary_10748500?related_id=10748500. [Accessed On: Feb 27, 2024].

12. “Photo free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/photo_2990729?term=photography&related_id=2990729. [Accessed On: Feb 27, 2024].

13. “Bullhorn free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/bullhorn_1998087?term=digital+marketing&related_id=1998087. [Accessed On: Feb 27, 2024].

14. “Shopping Online free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/shopping-online_1260235?term=digital+marketing&page=1&position=13&origin=search&related_id=1260235. [Accessed On: Feb 27, 2024].

15. Flatworldsolutions.com. [Online]. Available: https://cdn.flatworldsolutions.com/featured-images/top-10-online-video-editing-tools.jpg. [Accessed On: Feb 27, 2024].

16. Com.ph. [Online]. Available: https://www.truelogic.com.ph/wp-content/uploads/2021/09/dynamic_website.png. [Accessed On: Feb 27, 2024].

17. Ctfassets.net. [Online]. Available: https://images.ctfassets.net/ooa29xqb8tix/22yB0fxGdusPYvjeHt0tIc/5e8425645473fbfc465de26fff504c89/Metadata_the_Figma_Handbook.jpg. [Accessed On: Feb 27, 2024].

18. Berkeley.edu. [Online]. Available: https://multimedia.journalism.berkeley.edu/wp-content/uploads/stand_up_vo-main.jpg. [Accessed On: Feb 27, 2024].

19. Medium.com. [Online]. Available: https://miro.medium.com/v2/resize:fit:1400/1*MirlZnbuS9Cs9bVxxSPbjg.jpeg. [Accessed On: Feb 27, 2024].

20. Seo-hacker.com. [Online]. Available: https://seo-hacker.com/wp-content/uploads/2019/07/Cover-Photo-New-Website-SEO-A-Comprehensive-Guide-1024x768.jpg. [Accessed On: Feb 27, 2024].

21. Buffer.com. [Online]. Available: https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2022/10/thought-catalog-505eectW54k-unsplash.jpg. [Accessed On: Feb 27, 2024].
```

## Acknowledgments

- Design is inspired by [Fiverr](https://www.fiverr.com/) and [Upwork](https://www.upwork.com/).
- Created React application using template [create-react-app](https://create-react-app.dev/docs/getting-started)
- Used [Material-UI](https://v4.mui.com/getting-started/installation/) components and icons
- Used [react-multi-carousel](https://www.npmjs.com/package/react-multi-carousel)'s to create smooth carousel for displaying Popular Services component 
- Used [react-parallax](https://www.npmjs.com/package/react-parallax) for animation of Hero section for Landing page
- Used [typewriter-effect](https://www.npmjs.com/package/typewriter-effect) to animate text
 - [Render](https://render.com/) - For Backend hosting
 - Hats off to the Medium.com and Stackoverflow.com community for providing useful tutorials and solutions