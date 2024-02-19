import {
  Navbar,
  Nav,
  Container,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import './navbar.css';

const NavbarComponent = () => {
  return (
    <>
      <div className='container'>
        <Navbar bg='white' expand='lg'>
          <Container>
            <div className='d-flex flex-column w-100'>
              {/* First Row */}
              <div className='d-flex justify-content-between align-items-center w-100'>
                {/* Logo */}
                <Navbar.Brand as={NavLink} to='/'>
                  <img
                    src={logo}
                    height='120px'
                    className='d-inline-block align-top'
                    alt='Logo'
                  />
                </Navbar.Brand>

                {/* Search Bar */}
                <div className='search-container d-flex align-items-center'>
                  <InputGroup className='mb-6 smaller-search'>
                    <FormControl
                      placeholder='Search for services'
                      aria-label='Search'
                      aria-describedby='basic-addon2'
                    />
                  </InputGroup>
                </div>

                {/* Links */}
                <div className='d-flex'>
                  <Nav.Link as={NavLink} to='/wishlist'>
                    Wishlist
                  </Nav.Link>
                  <div className='mx-2'></div>
                  <Nav.Link as={NavLink} to='/cart'>
                    Cart
                  </Nav.Link>
                  <div className='mx-2'></div>
                  <Nav.Link as={NavLink} to='/profile'>
                    Profile
                  </Nav.Link>
                </div>
              </div>

              {/* Second Row */}
              <div className='w-100'>
                <Navbar.Toggle
                  className='ml-auto'
                  aria-controls='basic-navbar-nav'
                />
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='w-100 justify-content-center'>
                    <Nav.Link as={NavLink} to='/writing' className='mr-3'>
                      Writing
                    </Nav.Link>
                    <div className='mx-4'></div> {/* Add space between links */}
                    <Nav.Link as={NavLink} to='/programming' className='mr-3'>
                      Programming
                    </Nav.Link>
                    <div className='mx-4'></div> {/* Add space between links */}
                    <Nav.Link
                      as={NavLink}
                      to='/video-animation'
                      className='mr-3'
                    >
                      Video and Animation
                    </Nav.Link>
                    <div className='mx-4'></div> {/* Add space between links */}
                    <Nav.Link as={NavLink} to='/photography' className='mr-3'>
                      Photography
                    </Nav.Link>
                    <div className='mx-4'></div> {/* Add space between links */}
                    <Nav.Link as={NavLink} to='/others'>
                      Others
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </div>
            </div>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default NavbarComponent;
