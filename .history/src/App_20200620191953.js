import React, { useContext } from 'react'; // <-- updated
import 'bulma/css/bulma.css';
import { Auth0Context } from './context/auth0-context'; // <-- new

function App() {
  const auth0 = useContext(Auth0Context); // <-- new

  return (
    <div className="hero is-info is-fullheight">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1>Click Below!</h1>
        <button onClick={auth0.loginWithRedirect} className="button is-danger">
          Login
        </button>
      </div>
    </div>
  </div>
  );
}

export default App;
