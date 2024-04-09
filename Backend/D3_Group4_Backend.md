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
  - [Backend](#backend)
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

#### Backend:

In this project, we have structured our backend using the following folders:

- **Controller**: Contains the controller files responsible for handling incoming requests and returning appropriate responses.
- **Middleware**: Houses middleware functions used for request preprocessing, authentication, etc.
- **Models**: Contains the data models used in the application.
- **Routes**: Defines the API routes and connects them to the appropriate controller functions.

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

## Sources Used - Backend
I have used below sources while creating the backend

### user.model.js

*Lines 11 - 55*

``` js
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: String,
  last_name: String,
  description: String,
  mobile: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: String,
  password: String,
  profilePictureUrl: String,
  linkedInLink: String,
  instagramLink: String,
  facebookLink: String,
  isFreelancer: {
    type: Boolean,
    default: false,
  },
  occupation: String,
  skills: {
    type: Array,
    default: []
  },
  description: String,
  experience: String,
  education: {
    type: Array,
    default: []
  },
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

```

The code above was created by adapting the code in [Medium.com-Build a Secure Authentication System with NodeJS and MongoDB](https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144) as shown below: 

``` js
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
);

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the given password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

```

- The code in [Medium.com-Build a Secure Authentication System with NodeJS and MongoDB](https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144) was implemented by understanding the method requirement and taking only the method that was necessary - comparePassword
- [Medium.com-Build a Secure Authentication System with NodeJS and MongoDB](https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144)'s Code was used because I had difficulty understanding how to use JWT token and compare the encoded password in Node.
- [Medium.com-Build a Secure Authentication System with NodeJS and MongoDB](https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144)'s Code was modified by removing all the unncessary fields and methods, and adding new fields according to the requirement of our project


### auth.controller.js

*Lines 18 - 85*

``` js
export const register = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hash,
        address: req.body.address,
        profilePictureUrl: req.body.profilePictureUrl
    });
    const username = req.body.username;
    const email = req.body.email;
    try {
      const usernameExists = await User.find({username});
      const emailExists = await User.find({email});

      if(emailExists.length > 0){
        res.status(409).json({message:"Email already registered"});
      }
      else if(usernameExists.length > 0){
        res.status(409).json({message:"Username already exists"});
      }
      else{
        const newUser = await user.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
          expiresIn: '7d'
        });

        res.status(201).json({user: newUser, token: token});
      }
      
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}

/**
 * Login existing user
 * @param {*} req 
 * @param {*} res 
 */
export const login = async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }
      else{
        const passwordMatches = await user.comparePassword(password);
        if (!passwordMatches) {
          res.status(401).json({ message: 'Incorrect password' });
        }
        else{
          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '7d'
          });
          res.json({ userId: user._id, token: token });
        }
      }
      
    } catch (error) {
      next(error);
    }
};

```

The code above was created by adapting the code in [Medium.com-Build a Secure Authentication System with NodeJS and MongoDB](https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144) as shown below: 

``` js
// Register a new user
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

```
- The code in [Medium.com-Build a Secure Authentication System with NodeJS and MongoDB](https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144) was implemented by understanding how to create a token and hash a password.
- [Medium.com-Build a Secure Authentication System with NodeJS and MongoDB](https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144)'s Code was used because I had difficulty understanding how to create a JWT token and hash a password
- [Medium.com-Build a Secure Authentication System with NodeJS and MongoDB](https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144)'s Code was modified by using only the code related to token, hashing and adding extra validations for error handling.

### auth.js

*Lines 15 - 55*

``` js
export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    }
    catch(error){
        res.status(401).json({ message: 'Token is invalid' });
    }
}

/**
 * Middleware to check if the user exists
 * @param {*} req 
 * @param {*} res 
 */
export const getUser = async(req, res, next) => {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}

```

The code above was created by adapting the code in [Medium.com-Build a Secure Authentication System with NodeJS and MongoDB](https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144) as shown below: 

``` js
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

- The code in [Medium.com-Build a Secure Authentication System with NodeJS and MongoDB](https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144) was implemented by understanding how to create a middleware
- [Medium.com-Build a Secure Authentication System with NodeJS and MongoDB](https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144)'s Code was used because I wanted to understand how middleware works, and this code was generic and exactly what I needed.
- [Medium.com-Build a Secure Authentication System with NodeJS and MongoDB](https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144)'s Code was modified by using the basic authentication middleware and creating a getUser middleware based on it after understanding the code.


## References
Images used for the cards in the projects (they are cited in project readme file as well):
```
1. Creative IT Institute. [Hair Treatment Course Image]. [Online]. Available. https://www.creativeitinstitute.com/images/course/course_1663052056.jpg [Accessed On: Feb 6, 2024]

2. Dribbble. Hair Treatment App. [Online]. Available. https://dribbble.com/shots/19606563-Hair-Treatment-App [Accessed On: Feb 6, 2024]

3. Dribbble. Infinite Software. [Online]. Available. https://dribbble.com/shots/3812899-Infinite-Software/attachments/10034607?mode=media [Accessed On: Feb 6, 2024]

4. Dribbble. Skype Universal Windows App. [Online]. Available. https://dribbble.com/shots/2652326-Skype-Universal-Windows-App/attachments/9414061?mode=media [Accessed On: Feb 6, 2024]

5. Fotor. Profile Picture Ideas. [Online]. Available. https://www.fotor.com/blog/profile-picture-ideas/ [Accessed On: Feb 6, 2024]

6. Fiverr. "Fiverr - Freelance Services Marketplace", 2024. [Online]. Available: https://www.fiverr.com/ [Accessed on: February 6, 2024]

7. Upwork. "Upwork - The World's Work Marketplace, 2024" [Online]. Available: https://www.upwork.com/ [Accessed on: February 6, 2024]

8. Material UI. "Overview." [Online]. Available: [https://mui.com/material-ui/getting-started/](https://mui.com/material-ui/getting-started/) Accessed February 21, 2024.

9. “Diary free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/diary_10748360?term=writing&page=1&position=90&origin=search&related_id=10748360. [Accessed On: Feb 27, 2024].

10. “Code free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/code_1903572?term=programming&related_id=1903572. [Accessed On: Feb 27, 2024].

11. “Diary free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/diary_10748500?related_id=10748500. [Accessed On: Feb 27, 2024].

12. “Photo free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/photo_2990729?term=photography&related_id=2990729. [Accessed On: Feb 27, 2024].

13. “Bullhorn free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/bullhorn_1998087?term=digital+marketing&related_id=1998087. [Accessed On: Feb 27, 2024].

14. “Shopping Online free icon,” Flaticon. [Online]. Available: https://www.flaticon.com/free-icon/shopping-online_1260235?term=digital+marketing&page=1&position=13&origin=search&related_id=1260235. [Accessed On: Feb 27, 2024].

15. Flatworldsolutions.com. [Online]. Available: https://cdn.flatworldsolutions.com/featured-images/top-10-online-video-editing-tools.jpg. [Accessed On: Feb 27, 2024].

16. Com.ph. [Online]. Available: https://www.truelogic.com.ph/wp-content/uploads/2021/09/dynamic_website.png. [Accessed On: Feb 27, 2024].

17. Ctfassets.net. [Online]. Available: https://images.ctfassets.net/ooa29xqb8tix/22yB0fxGdusPYvjeHt0tIc/5e8425645473fbfc465de26fff504c89/Metadata_the_Figma_Handbook.jpg. [Accessed On: Feb 27, 2024].

18. Berkeley.edu. [Online]. Available: https://multimedia.journalism.berkeley.edu/wp-content/uploads/stand_up_vo-main.jpg. [Accessed On: Feb 27, 2024].

19. Medium.com. [Online]. Available: https://miro.medium.com/v2/resize:fit:1400/1*MirlZnbuS9Cs9bVxxSPbjg.jpeg. [Accessed On: Feb 27, 2024].

20. Seo-hacker.com. [Online]. Available: https://seo-hacker.com/wp-content/uploads/2019/07/Cover-Photo-New-Website-SEO-A-Comprehensive-Guide-1024x768.jpg. [Accessed On: Feb 27, 2024].

21. Buffer.com. [Online]. Available: https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2022/10/thought-catalog-505eectW54k-unsplash.jpg. [Accessed On: Feb 27, 2024].
```

## Acknowledgments

- Design is inspired by [Fiverr](https://www.fiverr.com/) and [Upwork](https://www.upwork.com/).
- Created React application using template [create-react-app](https://create-react-app.dev/docs/getting-started)
- Used [Material-UI](https://v4.mui.com/getting-started/installation/) components and icons
- Used [react-multi-carousel](https://www.npmjs.com/package/react-multi-carousel)'s to create smooth carousel for displaying Popular Services component 
- Used [react-parallax](https://www.npmjs.com/package/react-parallax) for animation of Hero section for Landing page
- Used [typewriter-effect](https://www.npmjs.com/package/typewriter-effect) to animate text
 - [Render](https://render.com/) - For Backend hosting
 - Hats off to the Medium.com and Stackoverflow.com community for providing useful tutorials and solutions