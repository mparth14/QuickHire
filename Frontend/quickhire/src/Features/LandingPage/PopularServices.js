import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const SERVICES = [
  {
    title: "Word Press",
    description: "Customize your site",
    image:
      "https://www.truelogic.com.ph/wp-content/uploads/2021/09/dynamic_website.png",
    link: "/category/Programming",
  },
  {
    title: "Video Editing",
    description: "Customize your site",
    image:
      "https://www.flatworldsolutions.com/featured-images/top-10-online-video-editing-tools.jpg",
    link: "/category/Video and Animation",
  },
  {
    title: "Figma Designs",
    description: "Customize your site",
    image:
      "https://images.ctfassets.net/ooa29xqb8tix/22yB0fxGdusPYvjeHt0tIc/5e8425645473fbfc465de26fff504c89/Metadata_the_Figma_Handbook.jpg",
    link: "/category/Graphics and Design",
  },
  {
    title: "Voice Over",
    description: "Customize your site",
    image:
      "https://multimedia.journalism.berkeley.edu/wp-content/uploads/stand_up_vo-main.jpg",
    link: "/category/Miscellaneous",
  },
  {
    title: "Event Photographer",
    description: "Customize your site",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*MirlZnbuS9Cs9bVxxSPbjg.jpeg",
    link: "/category/Photography",
  },
  {
    title: "SEO",
    description: "Customize your site",
    image:
      "https://seo-hacker.com/wp-content/uploads/2019/07/Cover-Photo-New-Website-SEO-A-Comprehensive-Guide-1024x768.jpg",
    link: "/category/Programming",
  },
  {
    title: "Content Writer",
    description: "Customize your site",
    image:
      "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2022/10/thought-catalog-505eectW54k-unsplash.jpg",
    link: "/category/Miscellaneous",
  },
];

const useStyles = makeStyles((theme) => ({
  serviceCard: {
    width: "90%",
    marginBottom: "1rem",
    position: "relative",
    textAlign: "center",
    [theme.breakpoints.down("500")]: {
      width: "100%",
    },
  },
  serviceContent: {
    position: "absolute",
    color: "#000",
    zIndex: "1",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
    },
  },
  sericeMedia: {
    height: 400,
    filter: "brightness(1.1)",
  },
  leftIconButton: {
    position: "absolute",
    zIndex: "1",
    left: "0",
  },
  rightIconButton: {
    position: "absolute",
    zIndex: "1",
    right: "0",
  },
  leftButton: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "50%",
    width: "2.5rem",
    height: "2.5rem",
  },
  rightButton: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "50%",
    width: "2.5rem",
    height: "2.5rem",
  },
  popularServicesContainer: {
    marginTop: "1rem",
  },
  text: {
    marginBottom: "1rem",
  },
}));

function PopularServices() {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [serviceCardIndex, setServiceCardIndex] = useState(0);
  const history = useHistory();

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <IconButton className={classes.leftIconButton} onClick={onClick}>
        <ChevronLeftIcon className={classes.leftButton} />
      </IconButton>
    );
  };

  const CustomRightArrow = ({ onClick }) => {
    return (
      <IconButton className={classes.rightIconButton} onClick={onClick}>
        <ChevronRightIcon className={classes.rightButton} />
      </IconButton>
    );
  };

  const handleMouseEnterEvent = (e, index) => {
    setHover(true);
    setServiceCardIndex(index);
  };

  const handleMouseLeaveEvent = (e, index) => {
    setHover(false);
    setServiceCardIndex(0);
  };

  const handleOnClick = (e, service) => {
    history.push(service.link);
  };

  return (
    <div className={classes.popularServicesContainer}>
      <Typography
        variant="h4"
        className={classes.text}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "900",
          marginTop: "28px",
          fontSize: "1.5rem",
        }}>
        Popular Services
      </Typography>
      <Carousel
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
            centerMode: true,
            partialVisibilityGutter: 40,
          },
          anotherTablet: {
            breakpoint: {
              max: 1024,
              min: 800,
            },
            items: 3,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 800,
              min: 500,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
          mobile: {
            breakpoint: {
              max: 500,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable>
        {SERVICES.map((service, index) => (
          <Card
            key={index}
            className={classes.serviceCard}
            onClick={(e) => handleOnClick(e, service)}
            onMouseEnter={(e) => handleMouseEnterEvent(e, index)}
            onMouseLeave={(e) => handleMouseLeaveEvent(e, index)}>
            {hover && serviceCardIndex === index && (
              <CardContent className={classes.serviceContent}>
                <Typography variant="h5">{service.title}</Typography>
              </CardContent>
            )}
            <CardMedia
              className={classes.sericeMedia}
              image={service.image}
              style={{
                opacity: hover && serviceCardIndex === index && "0.4",
              }}
            />
          </Card>
        ))}
      </Carousel>
    </div>
  );
}

export default PopularServices;
