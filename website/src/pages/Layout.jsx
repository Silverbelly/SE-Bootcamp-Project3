import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../page-styles/Layout.css';

const Layout = () => {
  return (
    <>
      <Navbar expand="sm" className="bg-info" fixed="top">
          <Navbar.Brand href="/">To-Do Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-5 me-auto">
              <Nav.Link href="/">Todo List</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
};
export default Layout;
