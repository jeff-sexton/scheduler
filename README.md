Interview Scheduler
=========

## Description

React single page application that allows a student to book, edit and delete technical interviews. Combines a concise API with a WebSocket server to build a realtime experience.

The final project has been hosted at https://practical-wescoff-763560.netlify.app for demonstration purposes.
 

## Final Product

!["Appointment Display"](https://raw.githubusercontent.com/jeff-sexton/scheduler/master/docs/Appointment_display.png)
!["Booking Interview"](https://raw.githubusercontent.com/jeff-sexton/scheduler/master/docs/Booking_interview.png)
!["Edit or Delete Interview"](https://raw.githubusercontent.com/jeff-sexton/scheduler/master/docs/EditDelete_interview.png)
!["Delete Confirmation"](https://raw.githubusercontent.com/jeff-sexton/scheduler/master/docs/Delete_confirmation.png)

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

## Development Dependencies

- babel/core
- storybook/addon-actions
- storybook/addon-backgrounds
- storybook/addon-links
- storybook/addons
- storybook/react
- testing-library/jest-dom
- testing-library/react
- testing-library/react-hooks
- jest-websocket-mock
- mock-socket
- node-sass
- prop-types
- react-test-renderer

## Getting Started

Note: This application requires a connection to an api server in order to populate initial data and for change persistance. See this repo for the api applicaion - https://github.com/jeff-sexton/scheduler-api .

1. Clone and configure API server
2. Install dependencies: `npm i`
3. Ensure local proxy settings are correct for api server in package.json, .env.development and .env.test

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress End-to-end test

```sh
npm run cypress
```


## Possible Future Features

- User accounts, login and validation
- Changes to api database to support a full calendar instead of a single week