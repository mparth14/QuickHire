import React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link: {
      display: 'flex',
      textDecoration: "none"
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#3F51B5"
        }
      }
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const RatingFilter = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-seller-native-simple">Seller Ratings</InputLabel>
      <Select
        native
        value={value}
        onChange={onChange}
        label="Seller Rating"
        inputProps={{
          id: 'outlined-seller-native-simple',
        }}
      >
        <option aria-label="None" value="" />
        <option value={"4.5"}>4.5 and above</option>
        <option value={"3.5"}>3.5 to 4.5</option>
        <option value={"2.5"}>2.5 to 3.5</option>
      </Select>
    </FormControl>
  );
};

export default RatingFilter;
