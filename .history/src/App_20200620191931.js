// src/App.js

// ...imports

function App() {
  const auth0 = useContext(Auth0Context);

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