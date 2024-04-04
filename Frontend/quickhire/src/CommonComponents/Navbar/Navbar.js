/**
 * Navbar component for the application.
 * Renders the navigation bar with search functionality and user authentication controls.
 * @param {Object} props - Component props.
 * @param {Object} props.user - User object containing user details.
 * @param {boolean} props.onload - Flag indicating whether the component is loaded.
 * @returns {JSX.Element} The rendered JSX element.
 */

import React, { useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import "./Navbar.css";
import logo from "../../assets/logo-white.svg";
import mobileLogo from "../../assets/logo-mobile.svg";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { SearchBar } from "./searchComponents/SearchBar";
import { SearchResultsList } from "./searchComponents/SearchResultsList";
import { useState } from "react";
import { CONFIG } from "../../config";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/**
 * Declaring style classes heer, becasue these classes will be use by mui components
 */
const useStyles = makeStyles((theme) => ({
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
    backgroundColor: alpha(theme.palette.common.white, 0.5),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "75%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(26),
      width: "45%",
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
    width: "100%",
    paddingLeft: theme.spacing(1),
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

export default function Navbar({ user, onload }) {
  const [results, setResults] = useState([]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [searchResults, setSearchResults] = React.useState([]);

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

  const logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    window.location.href = "/";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu =
    !onload || !user ? (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/login" className="menu-link">
            Sign In
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/signup" className="menu-link">
            Sign Up
          </Link>
        </MenuItem>
      </Menu>
    ) : (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/profile" className="menu-link">
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/checkout" className="menu-link">
            My Cart
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/service-orders" className="menu-link">
            My Orders
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <p onClick={logout} className="menu-link">
            Sign Out
          </p>
        </MenuItem>
      </Menu>
    );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu =
    !onload || !user ? (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}>
        <MenuItem className="menu-link" onClick={handleProfileMenuOpen}>
          <Link className="menu-link" to="/login">
            Sign In
          </Link>
        </MenuItem>
        <MenuItem className="menu-link" onClick={handleProfileMenuOpen}>
          <Link className="menu-link" to="/signup">
            Sign Up
          </Link>
        </MenuItem>
      </Menu>
    ) : (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}>
        <MenuItem className="menu-link" onClick={handleProfileMenuOpen}>
          <Link className="menu-link" to="/profile">
            Profile
          </Link>
        </MenuItem>
        <MenuItem className="menu-link" onClick={handleProfileMenuOpen}>
          <p className="menu-link" onClick={logout}>
            Sign Out
          </p>
        </MenuItem>
      </Menu>
    );

  let debounceTimeout;

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;

    // Clear the previous timeout to prevent multiple API calls
    clearTimeout(debounceTimeout);

    // Set a new timeout to execute the API call after 300 milliseconds of inactivity
    debounceTimeout = setTimeout(() => {
      // Fetch search results from the API
      fetch(`${CONFIG.BASE_PATH}services/search?title=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data))
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    }, 300);
  };
  return (
    <div className={"grow"}>
      <AppBar className="nav-appbar" position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"></IconButton>
          <Link to="/">
            <img src={logo} className="image-css" alt="Logo" />
          </Link>

          <div className={classes.search}>
            <SearchBar setResults={setResults} />
            {results && results.length > 0 && (
              <SearchResultsList results={results} />
            )}
          </div>

          <div className={"grow"} />
          <div className={classes.sectionDesktop}>
            <Link className="menu-link" to="/wishlist">
              <IconButton edge="end" aria-label="favorite" color="inherit">
                <FavoriteBorderIcon color="white" style={{ color: "white" }} />
              </IconButton>
            </Link>
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
              style={{ marginLeft: "-20px", marginRight: "-15px" }}
              edge="end"
              aria-label="favorite"
              color="inherit">
              <FavoriteBorderIcon color="white" style={{ color: "white" }} />
            </IconButton>
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
