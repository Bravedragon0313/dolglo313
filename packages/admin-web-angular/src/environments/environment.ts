// NOTE: Auto-generated file
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses 'environment.ts', but if you do
// 'ng build --env=prod' then 'environment.prod.ts' will be used instead.
// The list of which env maps to which file can be found in '.angular-cli.json'.

import { Environment } from './model';

export const environment: Environment = {
  production: false,

  SERVICES_ENDPOINT: 'http://localhost:5500',
  HTTPS_SERVICES_ENDPOINT: 'https://localhost:5501',
  GQL_ENDPOINT: 'http://localhost:5555/graphql',
  GQL_SUBSCRIPTIONS_ENDPOINT: 'ws://localhost:5050/subscriptions',

  GOOGLE_MAPS_API_KEY: '',

  DEFAULT_LATITUDE: 42.6459136,
  DEFAULT_LONGITUDE: 23.3332736,

  NO_INTERNET_LOGO: 'assets/images/logo.png',

  MAP_MERCHANT_ICON_LINK: 'http://maps.google.com/mapfiles/kml/pal3/icon21.png',

  MAP_USER_ICON_LINK: 'http://maps.google.com/mapfiles/kml/pal3/icon48.png',

  MAP_CARRIER_ICON_LINK: 'http://maps.google.com/mapfiles/kml/pal4/icon54.png',

  API_FILE_UPLOAD_URL: 'https://api.cloudinary.com/v1_1/evereq/upload',

  COMPANY_NAME: 'Ever Co. LTD',
  COMPANY_SITE_LINK: 'https://ever.co/',
  COMPANY_GITHUB_LINK: 'https://github.com/ever-co',
  COMPANY_FACEBOOK_LINK: 'https://www.facebook.com/evercoapp',
  COMPANY_TWITTER_LINK: 'https://twitter.com/evercoapp',
  COMPANY_LINKEDIN_LINK: 'https://www.linkedin.com/company/ever-co.',

  GENERATE_PASSWORD_CHARSET: 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_',

  CURRENCY_SYMBOL: '$',

  DEFAULT_LANGUAGE: 'en-US',

  // For maintenance micro service. Ever maintanance API URL: https://maintenance.ever.co/status
  SETTINGS_APP_TYPE: 'admin',
  SETTINGS_MAINTENANCE_API_URL: ''
};
