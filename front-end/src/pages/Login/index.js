import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { userLogin } from '../../store/actions/action';

// Selectors
import { getLoading } from '../../store/selectors';

// Styles
import "./Login.scss";

const LogIn = () => {
  const dispatch = useDispatch();

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Selectors
  const loading = useSelector(getLoading);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  }, [email, password]);

  return (
    <div className="auth-page">
      <div className="auth-page-container text-center">
        <h2 className="mb-4">Welcome!</h2>
        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <button
              type="submit"
              className="btn btn-primary w-50 mb-4 login-sumbit"
              disabled={!email || !password || loading}
            >
              {!loading && "Login"}
              {loading && (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
            <Link className="text-primary" to="/signup">
              Dont have an account? Register Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
