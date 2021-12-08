import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { userSignup } from '../../store/actions/action';

// Selectors
import { getLoading } from '../../store/selectors';

// Styles
import "./Signup.scss";

const SignUp = () => {
  const dispatch = useDispatch();

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Selectors
  const loading = useSelector(getLoading);

  const handleSignup = useCallback(async (e) => {
    e.preventDefault();
    dispatch(userSignup(email, password));
  }, [email, password]);

  return (
    <div className="auth-page">
      <div className="auth-page-container text-center">
        <h2 className="mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
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
              className="btn btn-primary w-50 mb-4 signup-sumbit"
              disabled={!email || !password || loading}
            >
              {!loading && "Signup"}
              {loading && (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
            <Link className="text-primary" to="/login">
              Do have an account? Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
