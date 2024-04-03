import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "20px",
    marginBottom: "20px"
  },
}));


const SubPagination = ({ itemsPerPage, totalItems, paginate }) => {
  const classes = useStyles();
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event, value) => {
    paginate(value);
  };

  return (
    <div className={classes.root}>
      <Pagination count={pageCount} onChange={handleChange} />
    </div>
  );
}

export default SubPagination;
