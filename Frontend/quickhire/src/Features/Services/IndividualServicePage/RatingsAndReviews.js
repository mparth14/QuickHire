/**
 * @Author Yashkumar Khorja
 * RatingsAndReviews component renders the ratings and reviews of service.
 * @returns {JSX.Element} - The rendered JSX element.
 */

import React, { useState } from "react";
import {
  Typography,
  Box,
  Divider,
  Avatar,
  LinearProgress,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

/**
   *I have dependency on Reviews feature and currently it is not ready
   so adding static data
  */

const ratingsAndReviews = [
  {
    user: "User1",
    avatar: "https://via.placeholder.com/150",
    rating: 4,
    review: "Great service, very satisfied!",
    timestamp: "2 days ago",
  },
  {
    user: "User2",
    avatar: "https://via.placeholder.com/150",
    rating: 5,
    review: "Excellent experience, highly recommended!",
    timestamp: "5 days ago",
  },
  {
    user: "User3",
    avatar: "https://via.placeholder.com/150",
    rating: 3,
    review: "Good service, could be improved.",
    timestamp: "1 week ago",
  },
];

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
    width: 50,
    height: 50,
  },
  ratingBarContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
}));

const RatingsAndReviews = () => {
  const classes = useStyles();
  const [selectedRating, setSelectedRating] = useState(null);

  const calculateAverageRating = (ratingsAndReviews) => {
    if (ratingsAndReviews.length === 0) return 0;

    const totalRating = ratingsAndReviews.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    return totalRating / ratingsAndReviews.length;
  };

  const handleRatingFilter = (rating) => {
    setSelectedRating(selectedRating ? null : rating);
  };

  const countReviewsByRating = (rating) => {
    return ratingsAndReviews.filter((item) => item.rating === rating).length;
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Box mb={2}>
        <Typography variant="h6">Reviews for this Service</Typography>
        <div style={{ display: "flex" }}>
          <Rating
            name="service-rating"
            value={calculateAverageRating(ratingsAndReviews)}
            readOnly
          />
          <Typography>(3)</Typography>
        </div>
      </Box>

      {[...Array(5).keys()].map((index) => (
        <Box
          key={index}
          className={classes.ratingBarContainer}
          alignItems="center">
          <Typography variant="body2">{index + 1} Star</Typography>
          <LinearProgress
            variant="determinate"
            value={
              (countReviewsByRating(index + 1) / ratingsAndReviews.length) * 100
            }
            onClick={() => handleRatingFilter(index + 1)}
            style={{ cursor: "pointer", width: "80%", marginLeft: "10px" }}
            color={selectedRating === index + 1 ? "secondary" : "primary"}
          />
          <Typography variant="body2" style={{ marginLeft: "10px" }}>
            {countReviewsByRating(index + 1)}
          </Typography>
        </Box>
      ))}

      <Divider style={{ marginBottom: "1rem" }} />
      {ratingsAndReviews
        .filter((item) =>
          selectedRating ? item.rating === selectedRating : true
        )
        .map((item, index) => (
          <>
            <Box display="flex" alignItems="start" flexWrap="wrap" mb={1}>
              <Avatar
                className={classes.avatar}
                src={item.avatar}
                alt={item.user}
              />
              <div>
                <Typography>{item.user}</Typography>
                <Rating name={`rating-${index}`} value={item.rating} readOnly />
                <Typography variant="body1">{item.review}</Typography>
              </div>
              <Box flexGrow={1} textAlign="right">
                <Typography variant="caption">{item.timestamp}</Typography>
              </Box>
            </Box>
            <Divider style={{ margin: "1rem 0" }} />
          </>
        ))}
    </div>
  );
};

export default RatingsAndReviews;
