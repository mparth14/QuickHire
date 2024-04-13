# QuickHire

QuickHire is like an online marketplace where people can offer their skills and services for others to hire or buy. Building an app or a website or even helping a person in developing something for your needs, QuickHire is the ideal platform for everyone.


* *Date Created*: 29 Jan 2024
* *Last Modification Date*: Apr 9, 2024
* *Frontend Deployed URL*: <https://quick-hire.netlify.app/>
* *Backend Deployed URL*: <https://quickhire-backend-1.onrender.com/>
* *Group Gitlab URL*: <https://git.cs.dal.ca/gupta2/csci_5709_grp-04/>

Note: Please give 50 seconds to 2 minutes to UI for loading data. As backend is hosted on Render as free tier, and it will take sometime to start.

## Authors

- [Hiteshkumar Gupta](ht643276@dal.ca) - _(Frontend, Backend Developer)_
- [Rahul Hambarde](rahul.hambarde@dal.ca) - _(Frontend, Backend Developer)_
- [Parth Pinakin Modi](pr571545@dal.ca) - _(Frontend, Backend Developer)_
- [Angel Christian](an321060@dal.ca) - _(Frontend, Backend Developer)_
- [Tijilkumar Parmar](tj950701@dal.ca) - _(Frontend, Backend Developer)_
- [Yashkumar Khorja](ys944579@dal.ca) - _(Frontend, Backend Developer)_

# Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Getting Started - Frontend](#getting-started---frontend)
  - [Sources Used](#sources-used---frontend)
- [Getting Started - Backend](#getting-started---backend)
  - [Sources Used](#sources-used---backend)
- [Acknowledgments](#acknowledgments)
- [References](#references)


## Features

1. **Product Wishlist Page**
2. **Search Result Page**
   - Services List
   - Sort options
3. **Individual Service Page**
   - Service Details
   - Add to Wishlist
   - Send Message
4. **Feedback and Rating System**
   - Both ways
5. **User Management**
   - Login Page
   - Sign up page
   - User Profile Page
     - Reviews as well
6. **Payment Gateway for Service**
   - Payment Processing on the individual service screen
7. **Become A Seller Setup**
   - Multiple pages, similar to Fiverr
8. **Service Creation Page for Seller**
9. **Wishlist for the User, My Services for the Seller**
    - View
    - Edit
    - Disable
10. **Subcategory Service Page**
    - When clicked on a broader category
11. **Orders Page**

## SEO, robots.txt and sitemap.xml
- QuickHire's SEO improve for search engine visibility.
- Included a robots.txt file to control search engine bot access to the site.
- Added a sitemap.xml file to aid search engine crawling and indexing.

## Project Structure
### Frontend
In our frontend implementation, we have adopted a feature-based organization structure:

- **Features Folder**: Contains subfolders for each feature of the application.
  - Within each feature folder:
    - **Components**: Individual components related to that feature.
    - **CSS Files**: Each component has its own CSS file, allowing for easier management of styles.

#### Backend:

In this project, we have structured our backend using the following folders:

- **Controller**: Contains the controller files responsible for handling incoming requests and returning appropriate responses.
- **Middleware**: Houses middleware functions used for request preprocessing, authentication, etc.
- **Models**: Contains the data models used in the application.
- **Routes**: Defines the API routes and connects them to the appropriate controller functions.

## Getting Started - Frontend
### Prerequisites

To have a local copy of this lab up and running on your local machine, you will first need to install the following libraries and tools:

```
git
node: v14.21.3
npm: v6.14.18
react: ^17.0.1
```

To have a local copy of this assingnment up and running on your local machine, you will first need to install the following software:

Download Install node from node website
```
Website: https://nodejs.org/en/download
```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone repository
```
git clone https://git.cs.dal.ca/gupta2/csci_5709_grp-04.git
```

Change directory to app
```
cd csci_5709_grp-04
cd Frontend
cd quickhire
```
Install packages
```
npm i
```
Create .env file add following credentials
```
REACT_APP_BACKEND_URL=https://quickhire-backend-1.onrender.com/api/v1/
REACT_APP_FIREBASE_API = AIzaSyAeyFuIDm34sjFU0_yGgMTJmpyJTCmoE5k
```
Run Project
```
npm start
```
Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Deployment

To deploy on ubuntu server, follow this steps:
Clone repository
```
git clone https://git.cs.dal.ca/gupta2/csci_5709_grp-04.git
```

Change directory to app
```
cd csci_5709_grp-04
cd Frontend
cd quickhire
```
Install packages
```
npm i
```
Create .env file add following credentia;s
```
REACT_APP_BACKEND_URL=https://quickhire-backend-1.onrender.com/api/v1/
REACT_APP_FIREBASE_API = AIzaSyAeyFuIDm34sjFU0_yGgMTJmpyJTCmoE5k
```
Build Project
```
npm run build
```
This will regenerate build folder which will contains index.html.

Point `nginx` server to this location.

Your server will be up and running.

## Built With

* [React](http://www.dropwizard.io/1.0.2/docs/) - The web library used
* [Material UI](https://v4.mui.com/getting-started/installation/) - Styling library
* [FlatIcon](https://www.flaticon.com/) - For icons
* [Stripe](https://stripe.com/) - Online payment processing platform

## Getting Started - Backend
### Prerequisites

To have a local copy of this lab up and running on your local machine, you will first need to install the following libraries and tools:

```
git
node: v14.21.3
npm: v6.14.18
```

To have a local copy of this assingnment up and running on your local machine, you will first need to install the following software:

Download Install node from node website
```
Website: https://nodejs.org/en/download
```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone repository
```
git clone https://git.cs.dal.ca/gupta2/csci_5709_grp-04.git
```

Change directory to app
```
cd csci_5709_grp-04
cd Backend
```
Create .env file add following credentia;s
```
PORT=4000
CORS_ORIGIN=*
MONGODB_URI=mongodb+srv://servicequickhire:QuickHire24@quickhire.fimqbyx.mongodb.net/quickhire?retryWrites=true&w=majority
SECRET_KEY=secret
USER=service.quickhire@gmail.com
PASS=evuu omfs gucw mhal
```

Install packages
```
npm i
```
Run Project
```
npm run dev
```
Navigate to `http://localhost:4000/`. The application will automatically reload if you change any of the source files.

## Deployment

To deploy on ubuntu server, follow this steps:
Clone repository
```
git clone https://git.cs.dal.ca/gupta2/csci_5709_grp-04.git
```

Change directory to app
```
cd csci_5709_grp-04
cd Backend
```
Install packages
```
npm i
```
Create .env file add following credentia;s
```
PORT=4000
CORS_ORIGIN=*
MONGODB_URI=mongodb+srv://servicequickhire:QuickHire24@quickhire.fimqbyx.mongodb.net/quickhire?retryWrites=true&w=majority
SECRET_KEY=secret
USER=service.quickhire@gmail.com
PASS=evuu omfs gucw mhal
```
Build Project
```
npm run build
```
This will regenerate build folder which will contains index.html.

Point `nginx` server to this location.

Your server will be up and running.

## Built With

* [Node.js](https://nodejs.org/) - JavaScript runtime
* [Express.js](https://expressjs.com/) - Web application framework for Node.js
* [MongoDB](https://www.mongodb.com/) - NoSQL database

## Acknowledgments

- Design is inspired by [Fiverr](https://www.fiverr.com/) and [Upwork](https://www.upwork.com/).
- Created React application using template [create-react-app](https://create-react-app.dev/docs/getting-started)
- Used [Material-UI](https://v4.mui.com/getting-started/installation/) components and icons
- Used [react-multi-carousel](https://www.npmjs.com/package/react-multi-carousel)'s to create smooth carousel for displaying Popular Services component 
- Used [react-parallax](https://www.npmjs.com/package/react-parallax) for animation of Hero section for Landing page
- Used [typewriter-effect](https://www.npmjs.com/package/typewriter-effect) to animate text
 - [Render](https://render.com/) - For Backend hosting
 - Hats off to the Medium.com and Stackoverflow.com community for providing useful tutorials and solutions
