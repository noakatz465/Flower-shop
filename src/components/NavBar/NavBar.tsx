import React, { FC, useState } from 'react';
import './NavBar.scss';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import Login from '../Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage, hideMessage } from '../../redux/slices/message';
import { disconnectUser } from '../../redux/slices/users';
import { search, clearSearch } from '../../redux/slices/search';

interface NavBarProps {
}

const NavBar: FC<NavBarProps> = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const user = useSelector((store: any) => store.usersSlice);
  const message = useSelector((state: any) => state.message);
  const _dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const _navigate = useNavigate();

  const disconnect = () => {
    _dispatch(disconnectUser());
    _dispatch(showMessage({ type: 'error', text: 'התנתקת בהצלחה!' }));
    setTimeout(() => {
      _dispatch(hideMessage());
    }, 3000);
  }

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    _dispatch(search(searchTerm));
    _navigate('/flower-list');
  }

  const handleOpenLogin = () => {
    setOpenLogin(true);
  }

  const handleCloseLogin = () => {
    setOpenLogin(false);
    _dispatch(showMessage({ type: 'success', text: 'המשתמש נוסף בהצלחה!' }));
    setTimeout(() => {
      _dispatch(hideMessage());
    }, 3000);
  }

  const goToHome = () => {
    _navigate('/home');
  }
  
  const goToCart = () => {
    _navigate('/cart');
  }

  return (
    <div className="NavBar">
      {openLogin && <Login show={openLogin} handleCloseLogin={handleCloseLogin}></Login>}
      <Container fluid>
        <div className="navbar-center">
          <img onClick={goToHome} src="/logo.png" alt="Logo" className="navbar-logo" />
        </div>
        <div className="navbar-right">
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <div className="search-container">
              <FaSearch className="search-icon" />
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 search-input"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </Form>
          <Button onClick={goToCart} variant="link" className="cart-button">
            <FaShoppingCart className="cart-icon" />
            <span className="cart-item-count">{user.itemInCart}</span>
          </Button>
          <NavDropdown title={<FaUser className="user-icon" />} id="basic-nav-dropdown">
            {user.loggedIn ? (
              <>
                <NavDropdown.Item href="#profile"> שלום {user.firstName}</NavDropdown.Item>
                <NavDropdown.Item onClick={disconnect} href="#details">התנתקות</NavDropdown.Item>
              </>
            ) : (
              <>
                <NavDropdown.Item onClick={handleOpenLogin} href="#login">התחברות</NavDropdown.Item>
                <NavDropdown.Item onClick={handleOpenLogin} href="#register">הרשמה</NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </div>
      </Container>
      <div className="navbar-categories">
        <Container fluid>
          <Nav className="me-auto my-2 my-lg-0 custom-nav" navbarScroll>
            <Link to="/home" className="nav-link">בית</Link>
            <Link to="/flower-list" className="nav-link">זרי פרחים</Link>
            <Link to="/about" className="nav-link">אודות</Link>
            <Link to="/contact" className="nav-link">צור קשר</Link>
          </Nav>
        </Container>
      </div>
      <Outlet />
      {message?.text && (
        <div style={{ direction: 'rtl' }} className={`mt-3 alert alert-${message?.type}`} role="alert">
          {message?.text}
        </div>
      )}
      <footer className="footer">
        <p>כל הזכויות שמורות &copy; 2024 חנות הפרחים שלנו</p>
      </footer>
    </div>
  );
};

export default NavBar;
