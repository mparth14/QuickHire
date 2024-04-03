import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  // IconButton,
  Link,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// import Favorite from "@material-ui/icons/Favorite";
import UserIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import RatingsAndReviews from "./RatingsAndReviews";
import { CONFIG } from "../../../config";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { AuthContext } from "../../AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2rem 6rem 6rem 6rem",
    [theme.breakpoints.down("sm")]: {
      margin: "1rem",
    },
  },
  breadcrumb: {
    marginBottom: "1rem",
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginTop: "5px",
  },
  serviceItems: {
    display: "flex",
    flexWrap: "wrap",
  },
  serviceDetails: {},
  serviceTitle: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  userIntroRating: {
    display: "flex",
    flexWrap: "wrap",
  },
  sellerCard: {
    marginTop: "1rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  contactButton: {
    marginTop: "1rem",
    backgroundColor: "#000",
    color: "#fff",
  },
  paper: {
    marginTop: "2rem",
    padding: "1rem",
  },
  userInfoDetails: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  skills: {
    display: "flex",
    flexWrap: "wrap",
  },
  skillText: {
    marginRight: theme.spacing(2),
  },
  checkoutOption: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginTop: "2rem",
    },
  },
  checkoutButton: {
    backgroundColor: "#000",
    color: "#fff",
  },
  sellerTitle: { marginTop: "2rem" },
  sellerAvatar: {
    width: "5rem",
    height: "5rem",
  },
  sellerIntro: {
    marginLeft: "1rem",
  },
  sellerSeparator: {
    margin: "0 1rem",
  },
  sellerIntroHeading: {
    fontWeight: "700",
  },
  sellerIntroDivider: {
    margin: "1rem 0",
  },
}));

const IndividualServicePage = ({ user, onload }) => {
  const classes = useStyles();
  const [service, setService] = useState(null);
  const { id } = useParams();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("600"));
  const { loading } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!user && onload) {
      history.push("/login");
    }
  }, [onload, user, history]);

  useEffect(() => {
    const getServiceByID = async () => {
      const response = await fetch(`${CONFIG.BASE_PATH}services/${id}`);
      const serviceInfo = await response.json();
      console.log({ serviceInfo });
      setService(serviceInfo);
    };

    getServiceByID();
  }, [id]);

  if (!user || loading) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        <Link href="/">
          <HomeIcon className={classes.homeIcon} />
        </Link>
        <Link href={`/category/${service?.data?.category}`}>
          {service?.data?.category}
        </Link>
        <Link href={`/subcategory/${service?.data?.subCategory}`}>
          {service?.data?.subCategory}
        </Link>
        <Typography color="inherit">{service?.data?.title}</Typography>
      </Breadcrumbs>

      <div className={classes.serviceItems}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <div className={classes.serviceDetails}>
              <Card>
                <CardMedia
                  image={service?.data?.imgUrl}
                  style={{ height: "50vh" }}
                />
              </Card>
              <div className={classes.serviceTitle}>
                <Typography variant="h5">{service?.data?.title}</Typography>
                {/* <IconButton>
                  <FavoriteBorder />
                </IconButton> */}
              </div>
              <Typography>{service?.data?.description}</Typography>

              {isSmallScreen && (
                <Paper className={classes.checkoutOption}>
                  <Card>
                    <CardHeader title="Place Your Order" />
                    <CardContent>
                      <Typography>
                        Price: CAD{service?.data?.price}/hr
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button className={classes.checkoutButton}>
                        Proceed To Checkout
                      </Button>
                    </CardActions>
                  </Card>
                </Paper>
              )}
              <Typography variant="h6" className={classes.sellerTitle}>
                About Seller
              </Typography>
              <div className={classes.sellerCard}>
                <Avatar src={<UserIcon />} className={classes.sellerAvatar} />
                <div className={classes.sellerIntro}>
                  <div>
                    <Typography>
                      {service?.data?.seller?.first_name}{" "}
                      {service?.data?.seller?.last_name}
                    </Typography>
                  </div>
                  <div className={classes.userIntroRating}>
                    <Typography>Ratings: 4.9</Typography>
                    <Typography className={classes.sellerSeparator}>
                      |
                    </Typography>
                    <Typography>
                      Experience: {service?.data?.seller?.experience}
                    </Typography>
                  </div>
                </div>
              </div>
              <Button variant="contained" className={classes.contactButton}>
                Contact Me
              </Button>
              <Paper className={classes.paper}>
                <div className={classes.userInfoDetails}>
                  <div>
                    <Typography className={classes.sellerIntroHeading}>
                      Education
                    </Typography>
                    <Typography>
                      {service?.data?.seller?.education?.[0]}
                    </Typography>
                  </div>
                  <div>
                    <Typography className={classes.sellerIntroHeading}>
                      Occupation
                    </Typography>
                    <Typography>{service?.data?.seller?.occupation}</Typography>
                  </div>
                  <div>
                    <Typography className={classes.sellerIntroHeading}>
                      Skills
                    </Typography>
                    <div className={classes.skills}>
                      {service?.data?.seller?.skills?.map((skill, index) => (
                        <Typography key={index} className={classes.skillText}>
                          {skill}
                        </Typography>
                      ))}
                    </div>
                  </div>
                </div>
                <Divider className={classes.sellerIntroDivider} />
                <div>
                  <Typography>{service?.data?.seller?.description}</Typography>
                </div>
              </Paper>
              <RatingsAndReviews />
            </div>
          </Grid>
          {!isSmallScreen && (
            <Grid item xs={12} sm={4} className={classes.checkoutOption}>
              <Paper>
                <Card>
                  <CardHeader title="Place Your Order" />
                  <CardContent>
                    <Typography>Price: CAD{service?.data?.price}/hr</Typography>
                  </CardContent>
                  <CardActions>
                    <Button className={classes.checkoutButton}>
                      Proceed To Checkout
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default IndividualServicePage;