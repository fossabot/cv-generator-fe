// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/** Development environment */
export const environment = {
  production: false,
  serverEndpointUri: 'https://cv-generator-project-server-eu.herokuapp.com',
  hosts: ['localhost', '192.168.1.2', '192.168.1.6', '192.168.99.100'],
  CV_GENERATOR_APPVEYOR_TOKEN: '',
  CV_GENERATOR_FE_SKIP_REDIRECT_TO_HTTPS: '',
  CV_GENERATOR_DOCKER_USERNAME: '',
  CV_GENERATOR_DOCKER_TOKEN: '',
  CV_GENERATOR_GITHUB_TOKEN: '',
  CV_GENERATOR_FE_DEBUG: true,

  CV_GENERATOR_FE_APP_NAME: 'CV Generator',
  CV_GENERATOR_FE_APP_PACKAGE_NAME: 'cv-generator-fe',

  CV_GENERATOR_FE_USE_SPDY: false,

  CI: false,
  CV_GENERATOR_AUDITING: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
