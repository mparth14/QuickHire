import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    marginTop: "20px",
    marginBottom: "20px"
  },
}));

export default function PaginationOutlined() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={10} variant="outlined" color="primary" />
    </div>
  );
}
