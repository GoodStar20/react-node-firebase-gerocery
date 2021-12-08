import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// Components
import App from './pages/App';

// Redux
import store from './store';
import history from './store/history';

// Other
import * as serviceWorker from './serviceWorker';

// Styles
import './index.scss';


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
