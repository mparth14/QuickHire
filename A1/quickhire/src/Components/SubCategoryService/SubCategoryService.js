import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import "./SubCategoryService.css"
import SelectButton from "../../Components/SelectButton/SelectButton"
import SubPagination from "../../Components/SubPagination/SubPagination"
import SubServiceCard from "../../Components/SubServiceCard/SubServiceCard"
import websiteImg from "../../assets/websitejpg.jpg";
import mobileImg from "../../assets/mobile.png";
import softwareImg from "../../assets/software.png"
import desktopImg from "../../assets/desktop.jpg"

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
}));

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}
const cardData = [
  {
    image: websiteImg,
    name: "Ben Tennyson",
    jobTitle: "iOS Developer",
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sintlor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur",
    rating: "5.0",
    rate: "49"
  },
  {
    image: mobileImg,
    name: "Steeve Naxerth",
    jobTitle: "Flutter Developer",
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sintlor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur",
    rating: "4.9",
    rate: "40"
  },
  
  {
    image: softwareImg,
    name: "Gewn Tennyson",
    jobTitle: "iOS Developer",
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sintlor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur",
    rating: "4.1",
    rate: "65"
  },
  
  {
    image: desktopImg,
    name: "Peter Griffin",
    jobTitle: "Android Developer",
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sintlor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur",
    rating: "3.9",
    rate: "30"
  },
  
  {
    image: softwareImg,
    name: "Brain Griffin",
    jobTitle: "iOS Developer",
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sintlor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur",
    rating: "4.9",
    rate: "40"
  },
  
  {
    image: mobileImg,
    name: "Kevin Levin",
    jobTitle: "Android App Developer",
    description: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sintlor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur",
    rating: "4.9",
    rate: "40"
  },
];

const SubCategoryService = () => {
  const classes = useStyles();
  const [state, setState] = React.useState(0);
  const [filterState, setFilterState] = React.useState(cardData);

  const handleChange = (event) => {
    setState(event.target.value);
    let temp = []
    if (event.target.value.length === 0){
      temp = cardData;
      setFilterState(temp);
      return
    }
    temp = cardData.filter((item) => item.rating === event.target.value);
    setFilterState(temp);
  };
  return (
    <div>
      <div className='breadcrumbs-css'>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/" onClick={handleClick} className={classes.link}>
            <HomeIcon className={classes.icon} />
          </Link>
          <Link color="inherit" href="subcategory" onClick={handleClick} className="link-deco" > Programming </Link>
        </Breadcrumbs>
      </div>

        <div className='sub-cat'>
          <h2>Mobile App Development</h2>
          <SelectButton state={state} handleChange={handleChange} />
          <br/>
          <h3>300+ Services available</h3>
          <div className='subservice-card'>
            <SubServiceCard state={state} cardData={filterState} />
          </div>
          <SubPagination />
        </div>
        </div>
  );
}

export default SubCategoryService;