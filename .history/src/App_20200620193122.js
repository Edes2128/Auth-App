import React, { useContext } from 'react'; // <-- updated
import 'bulma/css/bulma.css';
import { Auth0Context } from './context/auth0-context'; // <-- new

function App() {

  const { isLoading, user, loginWithRedirect } = useContext(Auth0Context);

  return  return (
    <div className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          {!isLoading && !user && (
            <>
              <h1>Click Below!</h1>
              <button onClick={loginWithRedirect} className="button is-danger">
                Login
              </button>
            </>
          )}
          {/* this is the new section */}
          {!isLoading && user && (
            <>
              <h1>You are logged in!</h1>
              <p>Hello {user.name}</p>

              {user.picture && <img src={user.picture} alt="My Avatar" />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
