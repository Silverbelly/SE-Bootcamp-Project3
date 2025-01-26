import { Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../page-styles/Layout.css';

const Layout = () => {
  return (
    <>
      <Navbar expand="md" className="bg-info pe-3" fixed="top">
          <Navbar.Brand href="/" className="ms-5 p-0"><img alt="logo" src='./logoCL.png' width="60" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-5 me-auto">
              <Nav.Link href="/todos">Todo List</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
};
export default Layout;
