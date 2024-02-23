import React, { useState } from 'react';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';
import writingColorLogo from '../../assets/writingColor.png';
import programmingColorLogo from '../../assets/programmingColor.png';
import photographyColorLogo from '../../assets/photographyColor.png';
import videoColorLogo from '../../assets/videoColor.png';
import marketingColorLogo from '../../assets/marketingColor.png';

const useStyles = makeStyles(theme => ({
    categoryPaper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        transition: 'transform 0.3s',
        '&:hover': {
            transform: 'scale(1.05)',
        },
        width: '150px',
        height: '200px',
        margin: theme.spacing(2),
        border: 'none',
        boxShadow: 'none',
    },
    categoryImage: {
        width: '100%',
        height: 'auto',
        marginBottom: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        filter: 'grayscale(70%)', 
        transition: 'filter 0.3s', 
        '&:hover': {
            filter: 'grayscale(0%)', 
        },
    },
    categoryName: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
        borderBottom: '1px solid blue',
        transition: 'border-bottom 0.3s',
        borderBottomWidth: '1px',
        height: '40px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '14px',
        fontWeight: 'bold',
        '&:hover': {
            borderBottomWidth: '2px',
        },
    },
    hoveredCategory: {
        borderBottomWidth: '2px',
    },
    categoriesHeading: {
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
}));

const categories = [
    {
        name: 'Writing',
        hoverImage: writingColorLogo,
    },
    {
        name: 'Programming',
        hoverImage: programmingColorLogo,
    },
    {
        name: 'Photography',
        hoverImage: photographyColorLogo,
    },
    {
        name: 'Video and Animation',
        hoverImage: videoColorLogo,
    },
    {
        name: 'Digital Marketing',
        hoverImage: marketingColorLogo,
    },
];

const CategorySection = () => {
    const classes = useStyles();
    const [hoveredCategory, setHoveredCategory] = useState(null);

    return (
        <Container>
            <Typography variant="h4" className={classes.categoriesHeading}>
                Categories
            </Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {categories.map((category, index) => (
                    <Paper
                        key={index}
                        className={`${classes.categoryPaper} ${hoveredCategory === category ? classes.hoveredCategory : ''
                            }`}
                        onMouseEnter={() => setHoveredCategory(category)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        <img
                            src={category.hoverImage}
                            alt={category.name}
                            className={classes.categoryImage}
                        />
                        <Typography
                            variant="h6"
                            className={`${classes.categoryName} ${hoveredCategory === category ? classes.hoveredCategory : ''
                                }`}
                        >
                            {category.name}
                        </Typography>
                    </Paper>
                ))}
            </div>
        </Container>
    );
};

export default CategorySection;
