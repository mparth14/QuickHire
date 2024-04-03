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

const BudgetFilter = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple">Budget</InputLabel>
      <Select
        native
        value={value}
        onChange={onChange}
        label="Budget"
        inputProps={{
          name: 'budget',
          id: 'outlined-age-native-simple',
        }}
      >
        <option aria-label="None" value="" />
        <option value={"20to35"}>20/hr to 35/hr</option>
        <option value={"35to45"}>35/hr to 45/hr</option>
        <option value={"above45"}>Above 45/hr</option>
      </Select>
    </FormControl>
  );
};

export default BudgetFilter;
