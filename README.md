# CSCI_5709_Grp-04
# Assignment 3
# QuickHire

QuickHire is like an online marketplace where people can offer their skills and services for others to hire or buy. Building an app or a website or even helping a person in developing something for your needs, QuickHire is the ideal platform for everyone.

- _Date Created_: 29 Jan 2024
- _Last Modification Date_: 04 Mar 2024
- _Frontend Deployed URL_: <https://quick-hire.netlify.app/>
- _Backend Deployed URL_: <https://quickhire-backend-1.onrender.com/api/v1/>
- _Group Git URL_: <https://git.cs.dal.ca/gupta2/csci_5709_grp-04>
- _Branch Git URL_: <https://git.cs.dal.ca/gupta2/csci_5709_grp-04/-/tree/yash-khorja?ref_type=heads>

## Authors

- [Yashkumar Khorja](ys944579@dal.ca) - _(Frontend, Backend Developer)_

# Feature: Individual Service Page

First of all, I have mentioned Service Orders Page feature in Assignment 2. But for Assignment 3 and in general flow of our app, this feature, i.e. Individual Service Page was a dependency for 3 of my team members. It was directly connected to Search feature in Navbar, Subcategory feature, and Checkout feature. So, I chose to complete Individual Service Page feature for this Assignment.

Individual Service Page helps user to view details of particular service. It showcases service description, price along with details of it's seller. It also showcases seller's details like seller education, occupation, description. On these page, user can add the service to their wishlist, can contact with seller, and add the service to the cart to proceed to checkout.

# Frontend Setup

### Prerequisites

To have a local copy of this Assignment 3 up and running on your local machine, you will first need to install the following software / libraries / plug-ins

- [Node.js](https://nodejs.org/en/download/current)
- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/download)

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be, assume the marker just acquired a computer

**Clone this Repo in your local using command**

```
git clone https://git.cs.dal.ca/gupta2/csci_5709_grp-04.git
```

**Checkout to my branch: yash-khorja**

```
git checkout yash-khorja
```

**Move inside React App using command**

```
cd Frontend/quickhire
```

**Install Dependencies using command**

```
npm install
```

**Create a file named ".env" and add following content**

```
REACT_APP_BACKEND_URL=https://quickhire-backend-1.onrender.com/api/v1/
REACT_APP_FIREBASE_API = AIzaSyAeyFuIDm34sjFU0_yGgMTJmpyJTCmoE5k

```

**Start React Server (Default is port 3000)**

```
npm start
```

After successfull running the react server, server will be started on browser.

## Deployment

Initially, we built our project in local. Then manually uploaded the build folder on Netlify. Finally, it was deployed and live on the mentioned link.

## Built With

- [React](https://legacy.reactjs.org/docs/getting-started.html/) - The web framework used
- [npm](https://docs.npmjs.com//) - Dependency Management
- [Material-UI](https://v4.mui.com/getting-started/installation/) - The React UI framework

# Backend Setup

### Prerequisites

To have a local copy of this Assignment 3 up and running on your local machine, you will first need to install the following software / libraries / plug-ins

- [Node.js](https://nodejs.org/en/download/current)
- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/download)

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be, assume the marker just acquired a computer

**Clone this Repo in your local using command**

```
git clone https://git.cs.dal.ca/gupta2/csci_5709_grp-04.git
```

**Checkout to my branch: yash-khorja**

```
git checkout yash-khorja
```

**Move inside React App using command**

```
cd Backend
```

**Install Dependencies using command**

```
npm install
```

**Create a file named ".env" and add following content**

```
PORT=4000
CORS_ORIGIN=*
MONGODB_URI=mongodb+srv://servicequickhire:QuickHire24@quickhire.fimqbyx.mongodb.net/quickhire?retryWrites=true&w=majority
SECRET_KEY=secret
USER=service.quickhire@gmail.com
PASS=evuu omfs gucw mhal
```

**Start React Server (Default is port 3000)**

```
npm run dev
```

After successfull running the node server, server will be started on browser.

## Deployment

Initially, we built our project in local. Then, uploaded repo on GitHub and connected my repo on Render for deployment.

## Built With

- [npm](https://docs.npmjs.com//) - Dependency Management
- [Node js](https://nodejs.org/en) - JS environment and library
- [Express js](https://expressjs.com/) - Node js web application framework

# Feature

## Tasks

- Design the layout for displaying service details, seller information, and action buttons.
- Decide on the arrangement of elements and overall aesthetic design.
- Set up the React component structure for the Individual Service Page.
- Implement logic to fetch service details from the backend API.
- Display the fetched service details including title, description, price, and image.
- Fetch and display seller information such as name, ratings, and experience.
- Implement action buttons for adding the service to cart and contacting the seller.
- Implement logic for redirecting user to login when clicked on action buttons if user is not logged in.
- Design and implement backend API endpoints for fetching service details and respective seller information.
- Implement authenticate middleware for protective/authenticated and secure API calls.
- Implement backend API endpoint to add service to the cart.
- Ensure the APIs return relevant data in the required format.
- Implement functionality to add the service to the user's cart.
- Implement the mechanism for contacting the seller.
- Ensure the page layout adapts well to different screen sizes for a seamless user experience.
- Test different scenarios such as adding the service to cart, contacting the seller, and responsiveness across devices.
- Integrate the Individual Service Page into the overall application flow.
- Link the page from search results, category/subcategory listings, or other relevant sections of the application.

## Frontend

### Individual Service Page:

- **File Path**: `IndividualServicePage.js` in `Frontend/quickhire/src/Features/Services/IndividualServicePage/` directory.

### Key Functionality:

- **Service Details Display**: Renders service details such as title, description, and image.
- **Seller Information**: Displays seller details including name, ratings, and experience.
- **Add to Cart**: Allows users to add the service to their cart for purchasing.
- **Contact Seller**: Provides a button to contact the seller for inquiries.
- **Responsive Design**: Ensures a seamless user experience across different screen sizes.

### Dependencies:

- **React**: JavaScript library for building user interfaces.
- **Material-UI**: React UI framework for designing consistent and responsive user interfaces.
- **React Router DOM**: Library for declaratively routing in React applications.
- **React Toastify**: Library for toast notifications in React applications.

### API Integration:

- **Fetching Service Details**: The component fetches service details from the backend API using the service ID obtained from the URL parameters.
- **Fetching Seller Information**: Seller information is retrieved from the backend API based on the service details.
- **Adding Service to Cart**: When a user clicks on "Add to Cart", an API call is made to the backend to add the service to the user's cart.
- **Contacting Seller**: The "Contact Me" button triggers a function to handle communication with the seller, which will be implemented once the feature is ready.

### How to Use:

- Navigate to the Individual Service Page by clicking on a service from search results or category/subcategory listings.
- View service details, seller information, and choose to add the service to the cart or contact the seller.
- Ensure a smooth experience across different devices with responsive design.

### Search Result Page:

- **File path**: `SearchResultPage.js` in `Frontend/quickhire/src/CommonComponents/Navbar/searchComponents/` directory.

### Key Functionality:

- **Result Linking**: Creates clickable search result items that redirect users to the individual service page.

### Dependencies:

- **React Router DOM**: Library for declaratively routing in React applications.

### How to Use:

- After performing a search, click on any search result to view the details of the corresponding service.
- The page will redirect to the Individual Service Page where users can explore service details and take necessary actions.

## Backend

### Services Controller:

- **File Path**: `services.controller.js` in `Backend/src/controllers/` directory.

### Key Functionality:

- **Create Service**: Creates a new service in the database.
- **Get All Services**: Retrieves all active services from the database.
- **Get Service by ID**: Retrieves a specific service by its ID, including seller details.
- **Update Service**: Updates an existing service by its ID in the database.
- **Delete Service**: Deletes a service by its ID from the database.
- **Get Services by Partial Hint**: Retrieves services based on partial hints provided in the query.

- **API I added**: `getServiceById`
  - **Purpose**: Added to fetch detailed information about a specific service, including the seller's details. This API is essential for displaying comprehensive service information on the Individual Service Page in the frontend. In this API, I am fetching service by id and from that service response, I am getting seller id, using which I got seller info. At last, I have added that additional seller info object in service response data.

### How to Use:

- To create a new service, send a POST request with service details to the appropriate endpoint.
- Retrieve all services using a GET request to the respective endpoint.
- Get a specific service by its ID using a GET request with the service ID as a parameter.
- Update an existing service by sending a PUT request with updated service details to the appropriate endpoint.
- Delete a service by its ID using a DELETE request to the respective endpoint.
- Retrieve services based on partial hints by sending a GET request with the search value as a query parameter.

### Cart Controller:

- **File Path**: `cart.controller.js` in `Backend/src/controllers/` directory.

### Key Functionality:

- **Add to Cart**: Adds a service to the user's cart in the database.
- **Get Cart**: Retrieves the user's cart from the database.
- **Remove from Cart**: Removes a service from the user's cart in the database.

- **API Added**: `addToCart`
  - **Purpose**: Added to allow users to add a service to their cart. This API checks if the service exists, updates the user's cart with the service ID, and calculates the total price of the cart. I have added this API, as I am adding service to cart in my feature. I have also added middleware to this API to authenticate whether user is logged in or not.

### How to Use:

- To add a service to the cart, send a POST request with userId and serviceId to the `addToCart` endpoint.
- Retrieve the user's cart using a GET request to the `getCart` endpoint with the userId as a parameter.
- To remove a service from the cart, send a DELETE request with userId and serviceId to the `removeFromCart` endpoint.

## Acknowledgments

- Created React application using template [create-react-app](https://create-react-app.dev/docs/getting-started)
- Used [Material-UI](https://v4.mui.com/getting-started/installation/) components and icons
