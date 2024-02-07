import './App.css';
import Navbar from './Components/Navbar/Navbar';
import CategoryCard from './Components/CategoryCard/CategoryCard'
import Header from './Components/Header/Header';
import CategoryName from './Components/CategoryName/CategoryName';
import Blog from './Components/Blog/Blog';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Home from "./Components/Home/Home"
import SubCategoryService from './Components/SubCategoryService/SubCategoryService';
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Header />        
        <Switch>
          <Route exact path ="/">
            <Home />
          </Route>
          <Route exact path ="/category">
            <CategoryName />
            <CategoryCard />
            <Blog />
          </Route>
          <Route exact path ="/subcategory">
            <SubCategoryService />
          </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
