const withSvgr = require('next-plugin-svgr');

module.exports = withSvgr({
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGIN_ID: process.env.FIREBASE_MESSAGIN_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
});
