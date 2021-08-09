## Project Structure

src
├── assets //contain base css, images, fonts, icons
| ├── css
| | ├── global.scss
| | ├── variables.scss
| | └── mixin.scss
| └── images
├── components // Define component use for whole project
| ├── Atoms //Smallest components
| | ├── Button
| | | ├── index.js
| | | └── styles.scss
| ├── Organisms
| ├── Templates
| ├── Molecules //Combine component in Atoms
| └── Pages //container components for route
| | ├── Auth
| | | ├── components // Define component use for Auth
| | | ├── index.js //
| | | └── styles.scss
├── constants
├── state // redux, saga, action, reducer
| ├── app
| | ├── actions.js
| | ├── constants.js
| | ├── reducer.js
| | ├── saga.js
| | ├── selector.js
| | └── index.js
| └── auth
├── translations
├── router //define router for project
| ├── public
| └── private
├── utilities
| ├── axios.js
| └── errorHandler.js

## Core Library

- antd: https://ant.design/components/overview/
- axios: https://github.com/axios/axios/
- redux-saga: https://redux-saga.js.org/
- immutablejs: https://immutable-js.github.io/immutable-js/docs/#/
- reselect: https://github.com/reduxjs/reselect/
- react-intl: https://formatjs.io/docs/react-intl/
- atomics design pattern: https://bradfrost.com/blog/post/atomic-web-design/

## Naming branch

- For develop new feature
  dev/tk-XX-description
- For fix bug in staging
  stag/tk-XX-description
