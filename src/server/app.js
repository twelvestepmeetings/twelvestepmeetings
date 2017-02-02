/* eslint-disable no-magic-numbers */
import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import expressGraphQL from 'express-graphql';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import mongoose from 'mongoose';
import schema from './schema';
import settings from 'settings';

/**
 * Initialize the database
 */
mongoose.connect(settings.MONGO_URI);

/**
 * Initialize the node app.
 */
const app = express();

/**
 * Middlewares
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/**
 * GraphQL
 */
app.use('/graphql', bodyParser.json(), apolloExpress({ schema }));

if (process.env.NODE_ENV !== 'production') {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}


/**
 * SPA
 */
app.get('*', (req, res) => res.sendFile(`${settings.APP_ROOT}/public/index.html`));

/**
 * Run the server
 */
app.listen(settings.APP_PORT, () => console.log(`App listening on port ${settings.APP_PORT}!`));
