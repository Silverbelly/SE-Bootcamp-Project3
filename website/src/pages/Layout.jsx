import { Outlet, Link } from "react-router-dom";
import '../page-styles/Layout.css';
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>&nbsp;&nbsp;
          </li>
          <li>
            <Link to="/contact">Contact</Link>&nbsp;&nbsp;
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};
export default Layout;