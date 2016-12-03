/* eslint-disable max-len, no-magic-numbers */

export const port = process.env.PORT || 3000;

export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

export const analytics = {
  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  }
};

export const auth = {
  jwt: { secret: process.env.JWT_SECRET || 's3cr3t' },
  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID || 'XXXXXXXXXXXXXXXX',
    secret: process.env.FACEBOOK_APP_SECRET || 'XXXXXXXXXXXXXXXXX',
  },
  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID || 'XXXXXXXXXXXX',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'XXXXXXXXXXX',
  }
};
