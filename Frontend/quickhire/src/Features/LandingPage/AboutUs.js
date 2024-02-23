import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  paperConatiner: {
    marginTop: "2rem",
    borderRadius: "2rem",
  },
  cardConatiner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 5rem",
    backgroundColor: "rgb(224 236 255)",
    borderRadius: "2rem",
  },
  content: {
    marginTop: "1rem",
  },
  media: {
    height: "25rem",
    width: "100rem",
  },
}));

function AboutUs() {
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.paperConatiner}>
      <Card className={classes.cardConatiner}>
        <CardContent>
          <Typography variant="h4">About Us</Typography>
          <Typography variant="h5" className={classes.content}>
            QuickHire platform aims to provide a platform for users to rent out
            or provide services related to their own acquired skills. Whether a
            seasoned developer, a creative designer, or a master problem-solver,
            looking for a platform, QuickHire will be one-stop solution.
            Employers will find professional skilled freelancers within few
            clicks, streamlined for everyone.{" "}
          </Typography>
        </CardContent>
        <CardMedia
          image="https://cdni.iconscout.com/illustration/premium/thumb/hr-hiring-new-applicants-using-there-ratings-4452595-3702211.png?f=webp"
          className={classes.media}
        />
      </Card>
    </Paper>
  );
}

export default AboutUs;
