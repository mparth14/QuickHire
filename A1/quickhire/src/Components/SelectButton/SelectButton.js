import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects({state, handleChange}) {
  const classes = useStyles();
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-seller-native-simple">Seller Ratings</InputLabel>
        <Select
          native
          value={state}
          onChange={handleChange}
          label="Seller Rating"
        >
          <option aria-label="None" value={null} />
          <option value={"5.0"}>5.0</option>
          <option value={"4.9"}>4.9</option>
          <option value={"Less than 3.0"}>Less than 3.0</option>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Budget</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          label="Age"
          inputProps={{
            name: 'budget',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>35/hr</option>
          <option value={20}>40/hr</option>
          <option value={30}>Greater than 40/hr</option>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Delivery Time</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          label="Age"
          inputProps={{
            name: 'delivery',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>10 days</option>
          <option value={20}>20 days</option>
          <option value={30}>More than 30 days</option>
        </Select>
      </FormControl>
    </div>
  );
}
