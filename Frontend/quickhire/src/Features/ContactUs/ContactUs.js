import React, { useState } from "react";
import { Parallax } from "react-parallax";
import { makeStyles } from "@material-ui/core";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import ThumbsUp from "./ContactUsAssets/thumbs-up.png";
import Background from "./ContactUsAssets/BackGround.png";

const useStyles = makeStyles((theme) => ({
  parentCard: {
    padding: "40px",
    margin: "15%",
    borderRadius: "40px",
    backgroundColor: "rgba(255,255,255,0.87)",
    [theme.breakpoints.down("sm")]: {
      margin: "5%",
    },
  },
}));

const ContactUs = () => {
  const classes = useStyles();

  const [formVisible, setFormVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    usage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      usage: "",
    });
    setFormVisible(true);
  };

  return (
    <Parallax
      bgImage={Background}
      strength={10}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper className={classes.parentCard}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            style={{ display: formVisible ? "none" : "block" }}
          >
            <Typography variant="h4" gutterBottom>
              Get in touch..
            </Typography>
            <Typography variant="body1" gutterBottom>
              At QuickHire, customer satisfaction stands as our paramount
              priority. We prioritize every interaction, service, and product
              with an unwavering commitment to exceed our customers'
              expectations.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div style={{ display: formVisible ? "none" : "block" }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Your Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Message"
                  placeholder="Your Message here*"
                  variant="outlined"
                  style={{ width: "100%" }}
                  name="message"
                  fullWidth
                  multiline
                  maxRows={2}
                  margin="normal"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="contained"
                  type="submit"
                  style={{
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                    width: "100%",
                    marginTop: "16px",
                  }}
                >
                  Submit
                </Button>
              </form>
            </div>
          </Grid>
          <div
            style={{
              display: formVisible ? "block" : "none",
              textAlign: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <img src={ThumbsUp} alt="Thumbs up" style={{ maxWidth: "100px" }} />
            <Typography variant="h6" gutterBottom>
              Your issue has been received. We will get back to you!
            </Typography>
          </div>
        </Grid>
      </Paper>
    </Parallax>
  );
};
export default ContactUs;
