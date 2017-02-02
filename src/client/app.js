import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';

/**
 * Init the GraphQL client
 */
const client = new ApolloClient();

/**
 * Make taps on links and buttons work fast on mobiles
 */
FastClick.attach(document.body);

/**
 * Render App
 */
ReactDOM.render((
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
), document.getElementById('app'));
