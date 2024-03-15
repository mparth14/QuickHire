import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AboutUsImage from "../../assets/aboutUs.png";

const useStyles = makeStyles((theme) => ({
  cardConatiner: {
    marginTop: "2rem",
    backgroundColor: "#a4a4a4",
    color: "#fff",
    borderRadius: "8px",
    padding: "16px",
    [theme.breakpoints.down("sm")]: {},
  },
  title: {
    textAlign: "center",
    fontWeight: "900",
  },
  subContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      overflow: "scroll",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  content: {
    marginTop: "1rem",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  media: {
    height: "50vh",
    width: "40vw",
    [theme.breakpoints.down("sm")]: {
      width: "60vw",
      height: "20vh",
    },
  },
}));

function AboutUs() {
  const classes = useStyles();

  return (
    <Card className={classes.cardConatiner}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h4" className={classes.title}>
          About Us
        </Typography>
        <div className={classes.subContent}>
          <CardMedia image={AboutUsImage} className={classes.media} />
          <Typography variant="h6" className={classes.content}>
            QuickHire platform aims to provide a platform for users to rent out
            or provide services related to their own acquired skills. Whether a
            seasoned developer, a creative designer, or a master problem-solver,
            looking for a platform, QuickHire will be one-stop solution.
            Employers will find professional skilled freelancers within few
            clicks, streamlined for everyone.{" "}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default AboutUs;
