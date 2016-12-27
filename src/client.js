import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import history from './core/history';
import App from './components/App';
import { ErrorReporter, deepForceUpdate } from './core/devUtils';

/**
 * Store a reference to the app instance, used for webpack HMR.
 */
let appInstance;
let currentLocation = history.location;

/**
 * Init the GraphQL client
 */
const client = new ApolloClient();

/**
 * Make taps on links and buttons work fast on mobiles
 */
FastClick.attach(document.body);

/**
 * Root react container
 */
const container = document.getElementById('app');

/**
 * Handle client-side navigation by using HTML5 History API
 * For more information visit https://github.com/mjackson/history#readme
 */
history.listen(onLocationChange);
onLocationChange(currentLocation);

/**
 * Enable Hot Module Replacement (HMR)
 */
if (module.hot) {
  module.hot.accept('./components/App', () => {

    if (appInstance) {
      try {
        // Force-update the whole tree, including components that refuse to
        // update
        deepForceUpdate(appInstance);
      } catch (error) {
        appInstance = null;
        document.title = `Hot Update Error: ${error.message}`;
        ReactDOM.render(<ErrorReporter error={error} />, container);
        return;
      }
    }

    onLocationChange(currentLocation);
  });
}

/* =============================================================================
=    Dependencies
============================================================================= */

// Re-render the app when window.location changes
async function onLocationChange(location) { // eslint-disable-line

  currentLocation = location;

  try {
    appInstance = ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      container,
    );
  } catch (error) {
    console.error(error); // eslint-disable-line no-console

    // Current url has been changed during navigation process, do nothing
    if (currentLocation.key !== location.key) {
      return;
    }

    // Display the error in full-screen for development mode
    if (process.env.NODE_ENV !== 'production') {
      appInstance = null;
      document.title = `Error: ${error.message}`;
      ReactDOM.render(<ErrorReporter error={error} />, container);
      return;
    }

    // Avoid broken navigation in production mode by a full page reload on error
    window.location.reload();
  }
}
