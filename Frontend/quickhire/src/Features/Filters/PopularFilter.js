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

const PopularFilter = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple">Popular</InputLabel>
      <Select
        native
        value={value}
        onChange={onChange}
        label="Popular"
        inputProps={{
          name: 'delivery',
          id: 'outlined-age-native-simple',
        }}
      >
        <option aria-label="All" value=""></option>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </Select>
    </FormControl>
  );
};

export default PopularFilter;
