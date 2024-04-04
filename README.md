# CSCI_5709_Grp-04
# Assignment 3
## Authors

* [Angel Christian](an321060@dal.ca) - *(Developer)*


# QuickHire

QuickHire is like an online marketplace where people can offer their skills and services for others to hire or buy. Building an app or a website or even helping a person in developing something for your needs, QuickHire is the ideal platform for everyone.

* *Date Created*: 29 Jan 2024
* *Last Modification Date*: 04 April 2024
* *Frontend Deployed URL*: <https://quick-hire.netlify.app/>
* *Backend Deployed URL*: <https://quickhire-backend-1.onrender.com/api/v1/>
* *Git URL(Group)*: <https://git.cs.dal.ca/gupta2/csci_5709_grp-04>
* *Git URL(Individual)*: <https://git.cs.dal.ca/gupta2/csci_5709_grp-04/-/tree/angel-christian>



# Frontend
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/downloads)


### Installing

#### Step 1: Clone the Repository

Open your terminal and run the following command to clone the project repository to your local machine:

```bash
git clone https://git.cs.dal.ca/gupta2/csci_5709_grp-04.git
```
#### Step 2: Navigate to the Project Directory

Open your terminal and run the following command to navingate to the project Directory:

```bash
cd Frontend/quickhire
```
#### Step 3: Install Project Dependencies

Open your terminal and run the following command to install all the required project dependencies:

```bash
npm install
```

#### Step 4: create/update Environment Variables

Create/update a `.env` file in the Frontend root directory and include the following variables with their values:
```bash
REACT_APP_BACKEND_URL= <BACKEND_URL>
REACT_APP_FIREBASE_API= <FIREBASE_API>
```

#### Step 5: Run the Application Locally

Open your terminal and run the following command to run the project on your local machine:

```bash
npm start
```

This will open the application in your default web browser. You can access it at http://localhost:3000.


## Deployment

This was deployed from the github using Netlify



## Built With

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces.

## Acknowledgments

This project was created using the creat-react-app to setup the react development environemnt described in the [Create a New React App](https://legacy.reactjs.org/docs/create-a-new-react-app.html) documentation.

Components provided by [Material-UI](https://material-ui.com/) - Making it easy to start and customize React applications.



# Backend
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/downloads)


### Installing

#### Step 1: Clone the Repository

Open your terminal and run the following command to clone the project repository to your local machine:

```bash
git clone https://git.cs.dal.ca/gupta2/csci_5709_grp-04.git
```
#### Step 2: Navigate to the Project Directory

Open your terminal and run the following command to navingate to the project Directory:

```bash
cd Backend
```
#### Step 3: Install Project Dependencies

Open your terminal and run the following command to install all the required project dependencies:

```bash
npm install
```
#### Step 4: create/update Environment Variables

Create/update a `.env` file in the Backend root directory and include the following variables with their values:
```bash
PORT= <PORT>
CORS_ORIGIN=*
MONGODB_URI= <MONGODB_URI>
SECRET_KEY= <JWT SECRET KEY>
USER= <GMAIL USER FOR EMAIL SMTP>
PASS= <GMAIL PASSWORD FOR EMAIL SMTP>
STRIPE_SECRET_KEY= <STRIPE_SECRET_KEY>
```

#### Step 5: Run the Application Locally

Open your terminal and run the following command to run the project on your local machine:

```bash
npm run dev
```

This will run the application on port 3000. You can access it at http://localhost:4000.


## Deployment

This was deployed from the github using render.



## Built With


* [Node.js](https://nodejs.org/en) - A JavaScript runtime built on Chrome's V8 JavaScript engine that enables server-side JavaScript execution.
* [Express.js](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.


# Feature - Service Creation By Seller
The ServiceCreationPage  allows users to add a new service. It provides a form where users can input details such as title, price, category, subcategory, description, and upload a banner image for their service.

## Related Tasks
Related Tasks:

1. User-friendly Form for Adding a New Service:
   - UI implementation, client-side validation, and profile page integration.

2. Image Upload Using Firebase Storage:
   - Implement image upload and Firebase integration.

3. Dynamic Category and Subcategory Selection:
   - Implement dynamic selection based on API data.

4. Integration with Backend API:
   - Integrate backend API, handle service creation, and update.

5. Client-side Form Validation:
   - Implement validation for fields and input format.

6. Backend Middleware for User Permissions:
   - Implement middleware for user permission checks.
   

## Files and Explanations:

1. Frontend/quickhire/src/Features/Services/ServiceCreationPage/ServiceCreationPage.js

   Code Explanation:
   - This file contains the implementation of the ServiceCreationPage component.
   - It provides a form for users to add a new service, including fields for title, price, category, subcategory, description, and image upload.
   - Client-side form validation is implemented to ensure data integrity.
   - Firebase storage is utilized for image upload functionality.
   - The component integrates with the backend API for service creation.
   - Various Material-UI components are used for UI design and user interaction.

2. Backend/src/middleware/auth.js

   Code Explanation:
   - This middleware file implements authentication logic.
   - It includes methods for verifying user authentication and authorization.
   - The "isSeller" middleware method is added to check if the user is a verified seller/freelancer with specific permissions.

3. Backend/src/models/services.model.js

   Code Explanation:
   - This file defines the schema for the Service model using Mongoose.
   - It specifies the structure of a service, including various fields such as title, description, category, subcategory, price, etc.
   - Validation rules are applied to fields such as description length and price format.

4. Backend/src/controllers/services.controller.js

   Code Explanation:
   - This controller file contains methods for creating and updating services.
   - The createService method creates a new service entry in the database.
   - The updateService method updates an existing service entry by ID(will be used later in different feature).
   - Error handling is implemented to handle validation errors and other exceptions.

5. Backend/src/routes/v1/services.routes.js

   Code Explanation:
   - This file defines routes for service-related endpoints.
   - Middleware functions are utilized to ensure access control, allowing only verified sellers to access certain endpoints.
   - The createService route uses the "authenticate" and "isSeller" middleware to grant access only to valid sellers.

6. Frontend/quickhire/src/utils/firebaseConfig.js

   Code Explanation:
   - This file contains the Firebase configuration necessary for image storage.
   - Firebase SDK functions are imported to initialize the app and get storage.
   - The firebaseConfig object includes the project's Firebase configuration details.
   - The imageStorage constant is exported to provide access to Firebase storage for storing seller's service banner images.

## Flow to Check the Feature:
1. Navigate to the profile page or click on the profile icon to open the ServiceCreationPage.
2. Fill in all required fields in the form, including title, price, category, subcategory, description, and upload a banner image.
3. Once all the data is filled correctly, it will display toast to show that the service was created successfully or an error message in case of failure.

