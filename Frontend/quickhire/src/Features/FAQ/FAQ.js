import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
  Container,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";
import Background from "./FAQAssets/BackGround.png";

const useStyles = makeStyles((theme) => ({
  parentCard: {
    padding: "20px",
    margin: "5% 15% 5% 15%",
    borderRadius: "40px",
    backgroundColor: "rgba(255,255,255,0.87)",
    [theme.breakpoints.down("sm")]: {
      margin: "5%",
    },
  },
}));

const FAQS = [
  {
    question: "How is my personal information secured?",
    answer:
      "We prioritize your privacy. Rest assured, your information is kept secure and confidential.",
  },
  {
    question: "What is QuickHire all about?",
    answer:
      "QuickHire is a versatile platform connecting freelancers with job providers. It facilitates the exchange of skills and services between users.",
  },
  {
    question: "What activities can I perform on QuickHire?",
    answer:
      "You can:\n- Search for skilled freelancers\n- Offer your expertise as a freelancer to those in need",
  },
  {
    question: "How do I reset my password if I forget it?",
    answer:
      'If you forget your password, you can easily reset it by clicking on the "Forgot Password" link on the login page. Follow the instructions sent to your registered email address to set a new password and regain access to your account.',
  },
  {
    question: "How can I ensure the quality of services?",
    answer:
      "QuickHire allows users to leave reviews and ratings for freelancers. You can check these reviews to assess the quality of services provided by freelancers on the platform.",
  },
  {
    question: "As a Service Provider, Can I edit my Services?",
    answer:
      "Yes, you can edit or disable your Services at any time. Simply go to your profile settings, make the necessary changes, and save.",
  },
];

function FAQPage() {
  const classes = useStyles();
  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        width: "100%",
        height: "100%",
      }}
    >
      <Paper className={classes.parentCard}>
        <Box>
          <>
            <Box
              sx={{
                backgroundColor: "white",
                py: 3,
                px: { xs: 2, sm: 4, md: 6 },
                textAlign: "left",
                color: "red",
                marginBottom: "20px",
              }}
            ></Box>
            <Container maxWidth="md">
              <Typography variant="h4">Frequently Asked Questions</Typography>
              <Box
                sx={{
                  overflowY: "auto",
                  marginBottom: "20px",
                  marginTop: "25px",
                }}
              >
                {FAQS.map((faq, index) => (
                  <Accordion
                    key={index}
                    style={{
                      backgroundColor: "#FFFFFF87",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={index}
                      id={index}
                    >
                      <Typography variant="h6">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        style={{
                          textAlign: "left",
                          fontFamily: "inherit",
                          color: "#444",
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Container>
          </>
        </Box>
      </Paper>
    </div>
  );
}

export default FAQPage;
