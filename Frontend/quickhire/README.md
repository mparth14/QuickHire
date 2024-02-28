# CSCI_5709_Grp-04

# QuickHire

QuickHire is like an online marketplace where people can offer their skills and services for others to hire or buy. Building an app or a website or even helping a person in developing something for your needs, QuickHire is the ideal platform for everyone.

* *Date Created*: 29 Jan 2024
* *Last Modification Date*: 27 Feb 2024
* *Deployed URL*: <https://quick-hire.netlify.app/>
* *Git URL*: <https://git.cs.dal.ca/gupta2/csci_5709_grp-04/-/tree/main/Frontend/quickhire?ref_type=heads>

## Authors

- [Hiteshkumar](ht643276@dal.ca) - _(Frontend, Backend Developer)_
- [Rahul Hambarde](rahul.hambarde@dal.ca) - _(Frontend, Backend Developer)_
- [Parth Pinakin Modi](pr571545@dal.ca) - _(Frontend, Backend Developer)_
- [Angel Christian](an321060@dal.ca) - _(Frontend, Backend Developer)_
- [Tijilkumar Parmar](tj950701@dal.ca) - _(Frontend, Backend Developer)_
- [Yashkumar Khorja](ys944579@dal.ca) - _(Frontend, Backend Developer)_

## Getting Started
### Prerequisites

To have a local copy of this project up and running on your local machine, you will first need to install the following libraries and tools:

```
git
node: v14.21.3
npm: v6.14.18
react: ^17.0.1
```

To have a local copy of this project up and running on your local machine, you will first need to install the following software:

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
Run Project
```
npm start
```
Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Deployment

To deploy on Netlify, follow this steps:
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
Build Project
```
npm run build
```
Then manually upload the build folder on Netlify. Finally, it's deployed and live on the mentioned link.

## Built With

* [React](http://www.dropwizard.io/1.0.2/docs/) - The web library used
* [Material UI](https://v4.mui.com/getting-started/installation/) - Styling library
* [FlatIcon](https://www.flaticon.com/) - ForIcons

## Sources Used
### Navbar.js

_Lines 1 - 241_

```
import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ListIcon from "@material-ui/icons/ListAlt";
import MessageIcon from "@material-ui/icons/Message";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function NavBar() {
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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
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
          color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{ borderTopLeftRadius: "2rem", borderTopRightRadius: "2rem" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            QuickHire
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
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="service orders" color="inherit">
              <MessageIcon />
            </IconButton>
            <IconButton aria-label="service orders" color="inherit">
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton aria-label="service orders" color="inherit">
              <ListIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
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

The code above was created by adapting the code in [App Bar - Official Material UI Components](https://v4.mui.com/components/app-bar/) as shown below:

```
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
- The code in [App Bar - Official Material UI Components](https://v4.mui.com/components/app-bar/)'s was implemented by adapting and modifying the code provided in the App Bar with a primary search field example from Material-UI's documentation. The implementation includes customization to suit the specific requirements of the project, such as incorporating a logo, styling adjustments, and integrating additional functionalities.
- [App Bar - Official Material UI Components](https://v4.mui.com/components/app-bar/)'s code was used because it contains search bar and icons on respective place. I try to implement it using custom css but it wasn't proper. Hence, we decided to use MUI's App Bar. It is responsive hence available for all screens. It was our belief that incorporating well-implemented code from external sources would expedite the development process and help me achieve the desired functionality and efficiency.
- [App Bar - Official Material UI Components](https://v4.mui.com/components/app-bar/)'s code was modified by altering it according to the need of component with changes in code. Like discarding number badges and the icon buttons it provided, and replaced the icon buttons according to the requirements of the module.

## References
[1] “Diary free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/diary_10748360?term=writing&page=1&position=90&origin=search&related_id=10748360. [Accessed On: Feb 27, 2024].

[2] “Code free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/code_1903572?term=programming&related_id=1903572. [Accessed On: Feb 27, 2024].

[3] “Diary free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/diary_10748500?related_id=10748500. [Accessed On: Feb 27, 2024].

[4] “Photo free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/photo_2990729?term=photography&related_id=2990729. [Accessed On: Feb 27, 2024].

[5] “Bullhorn free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/bullhorn_1998087?term=digital+marketing&related_id=1998087. [Accessed On: Feb 27, 2024].

[6] “Shopping Online free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/shopping-online_1260235?term=digital+marketing&page=1&position=13&origin=search&related_id=1260235. [Accessed On: Feb 27, 2024].

## Acknowledgments
- Created React application using template [create-react-app](https://create-react-app.dev/docs/getting-started)
- Used [Material-UI](https://v4.mui.com/getting-started/installation/) components and icons
- Used [react-multi-carousel](https://www.npmjs.com/package/react-multi-carousel)'s to create smooth carousel for displaying Popular Services component 
- Used [react-parallax](https://www.npmjs.com/package/react-parallax) for animation of Hero section for Landing page
- Used [typewriter-effect](https://www.npmjs.com/package/typewriter-effect) to animate text
