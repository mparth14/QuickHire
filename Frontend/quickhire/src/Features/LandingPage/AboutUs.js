import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  cardConatiner: {
    backgroundColor: "rgb(224 236 255)",
    borderRadius: "8px",
    padding: "16px",
    [theme.breakpoints.down("sm")]: {},
  },
  subContent: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      overflow: "scroll",
      flexDirection: "column-reverse",
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
    height: "23rem",
    width: "35%",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      height: "11rem",
    },
  },
}));

function AboutUs() {
  const classes = useStyles();

  return (
    <Card className={classes.cardConatiner}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">About Us</Typography>
        <div className={classes.subContent}>
          <Typography variant="h6" className={classes.content}>
            QuickHire platform aims to provide a platform for users to rent out
            or provide services related to their own acquired skills. Whether a
            seasoned developer, a creative designer, or a master problem-solver,
            looking for a platform, QuickHire will be one-stop solution.
            Employers will find professional skilled freelancers within few
            clicks, streamlined for everyone.{" "}
          </Typography>
          <CardMedia
            image="https://cdni.iconscout.com/illustration/premium/thumb/hr-hiring-new-applicants-using-there-ratings-4452595-3702211.png?f=webp"
            className={classes.media}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default AboutUs;
