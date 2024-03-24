import React from "react";
import { Container, Button, Typography, makeStyles } from "@material-ui/core";
import joinNowImage from "../../assets/joinUs.png";

const useStyles = makeStyles((theme) => ({
  joinNowSection: {
    backgroundColor: "#020336",
    padding: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  },
  joinNowImage: {
    width: "100%",
    maxWidth: "400px",
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },
  joinNowButton: {
    backgroundColor: "#fff",
    color: "#450505",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    fontSize: "16px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  tagline: {
    color: "#fff",
    marginBottom: theme.spacing(2),
  },
}));

const JoinNowSection = () => {
  const classes = useStyles();

  return (
    <Container className={classes.joinNowSection}>
      <img src={joinNowImage} alt="Join Now" className={classes.joinNowImage} />
      <div>
        <Typography variant="h4" className={classes.tagline}>
          From Ideas to Reality - Hire the Best for Your Projects!
        </Typography>
        <Typography
          variant="body1"
          style={{ color: "#fff", marginBottom: "16px", fontSize: "20px" }}>
          Ready to join us? Start now and explore a world of possibilities.
        </Typography>
        <Button variant="contained" className={classes.joinNowButton}>
          Join Now
        </Button>
      </div>
    </Container>
  );
};

export default JoinNowSection;
