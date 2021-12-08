import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, withRouter, Switch, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Components
import Login from './Login';
import Signup from './Signup';
import Products from './Products';
import Profile from './Profile';
import Product from './Product';

// Styles
import './App.scss';

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products">
                Products
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products" component={Products} />
        <Route path="/profile" component={Profile} />
        <Route path="/product" component={Product} />
      </Switch>
      <ToastContainer />
    </div>
    
  );
};

export default withRouter(App);
