/**
 * Footer components, it will stick to the bottom of the page.
 * @return Footer componnet 
 */
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "../../assets/logo.svg";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box component="footer" bgcolor="#e6f1ed" pb={4} boxShadow={2} mt={4}>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="black" align="center">
              Categories
            </Typography>
            <Typography align="center">
              <Link
                href="/writing"
                color="inherit"
                underline="none"
                style={{ color: "grey" }}
              >
                Writing
              </Link>
            </Typography>
            <Typography align="center">
              <Link
                href="/programming"
                color="inherit"
                underline="none"
                style={{ color: "grey" }}
              >
                Programming
              </Link>
            </Typography>
            <Typography align="center">
              <Link
                href="/photography"
                color="inherit"
                underline="none"
                style={{ color: "grey" }}
              >
                Photography
              </Link>
            </Typography>
            <Typography align="center">
              <Link
                href="/video-animation"
                color="inherit"
                underline="none"
                style={{ color: "grey" }}
              >
                Video and Animation
              </Link>
            </Typography>
            <Typography align="center">
              <Link
                href="/digital-marketing"
                color="inherit"
                underline="none"
                style={{ color: "grey" }}
              >
                Digital Marketing
              </Link>
            </Typography>

            <Typography align="center">
              <Link
                href="/others"
                color="inherit"
                underline="none"
                style={{ color: "grey" }}
              >
                Others
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="black" align="center">
              About
            </Typography>
            <Typography align="center">
              <Link
                href="/contact-us"
                color="inherit"
                underline="none"
                style={{ color: "grey" }}
              >
                Contact Us
              </Link>
            </Typography>
            <Typography align="center">
              <Link
                href="/faqs"
                color="inherit"
                underline="none"
                style={{ color: "grey" }}
              >
                FAQs
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6" gutterBottom color="black" align="center">
              <Link component={RouterLink} to="/">
                <img
                  src={Logo}
                  alt="Logo"
                  style={{ maxWidth: "100px", verticalAlign: "middle" }}
                />
              </Link>
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              align="center"
              style={{ color: "grey" }}
            >
              Copyright © 2024
            </Typography>
            <Box mt={2}>
              <IconButton href="https://www.facebook.com">
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://www.instagram.com">
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://www.linkedin.com">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
