/**
 * @Author Tijilkumar Parmar
 * Rating Service Dialog for the user to rate a service
 */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { CONFIG } from "../config.js";

const useStyles = makeStyles((theme) => ({
  ratingPopup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: "rgba(255, 255,255, 0.9)",
    padding: "30px",
    borderRadius: "30px",
    maxWidth: "80%",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  },
  ratingStars: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
    marginTop: "8px",
    color: "orange",
  },
  star: {
    fontSize: "44px",
    cursor: "pointer",
  },
  submitButton: {
    marginTop: "10px",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    width: "100%",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  submitButtonHover: {
    backgroundColor: "#0056b3",
  },
}));

const RatingPopup = ({ serviceID, user, onClose }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (user != null) {
      const dataToSend = {
        serviceID: serviceID,
        rating: rating,
        review: comment,
        userId: user.email,
        createdAt: new Date().getTime(),
      };
      const uploadReview = async () => {
        const response = await fetch(`${CONFIG.BASE_PATH}rating`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
      };
      uploadReview();
      onClose();
    }
  };

  return (
    <div className={classes.ratingPopup}>
      <div className={classes.popupContent}>
        <CloseIcon className={classes.closeIcon} onClick={onClose} />
        <h2>Rate your experience!</h2>
        <h3 style={{ marginTop: "8px" }}>
          How would you rate your experience out of 5 stars?
        </h3>
        <div className={classes.ratingStars}>
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <span
                key={index}
                className={classes.star}
                onClick={() => handleRatingChange(ratingValue)}
              >
                {ratingValue <= rating ? "★" : "☆"}
              </span>
            );
          })}
        </div>
        <textarea
          placeholder="Have more to say?.."
          value={comment}
          onChange={handleCommentChange}
          style={{ width: "96%", marginBottom: "10px", padding: "2%" }}
        />
        <button
          className={`${classes.submitButton} ${classes.submitButtonHover}`}
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default RatingPopup;
