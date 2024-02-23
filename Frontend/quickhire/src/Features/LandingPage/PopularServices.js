import React from "react";
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

const SERVICES = [
  {
    title: "Word Press",
    description: "Customize your site",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png",
  },
  {
    title: "Video Editing",
    description: "Customize your site",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png",
  },
  {
    title: "Figma Designs",
    description: "Customize your site",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png",
  },
  {
    title: "Voice Over",
    description: "Customize your site",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png",
  },
  {
    title: "Event Photographer",
    description: "Customize your site",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png",
  },
  {
    title: "SEO",
    description: "Customize your site",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png",
  },
  {
    title: "Movie Making",
    description: "Customize your site",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png",
  },
];

const useStyles = makeStyles(() => ({
  serviceCards: {
    display: "flex",
    alignItems: "center",
    overflowX: "hidden",
    position: "relative",
    padding: "0 1rem",
  },
  serviceCard: {
    flex: "0 0 auto",
    width: "20vw",
    marginLeft: "1rem",
    marginBottom: "1rem",
    position: "relative",
    transition: "transform 0.5s ease",
  },
  serviceContent: {
    position: "absolute",
    color: "#fff",
  },
  sericeMedia: {
    height: 400,
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
    padding: "0 5rem",
  },
  text: {
    marginBottom: "1rem",
  },
}));

function PopularServices() {
  const classes = useStyles();

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

  return (
    <div className={classes.popularServicesContainer}>
      <Typography variant="h4" className={classes.text}>
        Popular Services
      </Typography>
      <div>
        <Carousel
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={true}
          className=""
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
          renderButtonGroupOutside={true}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
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
            <Card key={index} className={classes.serviceCard}>
              <CardContent className={classes.serviceContent}>
                <Typography variant="h6">{service.description}</Typography>
                <Typography variant="h4">{service.title}</Typography>
              </CardContent>
              <CardMedia
                className={classes.sericeMedia}
                image={service.image}
              />
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default PopularServices;
