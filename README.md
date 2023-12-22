# Wülen | Happy Hour Finder

This project displays business markers on a map using Mapbox and allows users to search, and filter them by category.

## Project Overview

## 1.1 Description

Develop an interactive app that allow users to search or filter happy hour special, click on markers to see more details about the place and leave reviews or ratings (Maybe login without auth). Mobile first design accessible from a smartphone, tablet or desktop computer.

## 1.2 Problem

Happy hours a great way to save money on drinks or food at restaurants and bars. Maybe the user is new in the area or isn't familiar with the local neighborhood. This is when user can easily find the nearest places that offer happy hour deals. Only a few online blogs provide some information, and usually hasn’t been updated. Also, there are no workings apps in the city of Vancouver, only one web page that does the job but is not friendly enough to provide just the necessary information, therefore this is a great opportunity for those who haven’t found what they are been looking for.

## 1.3 User Profile

The final user would likely be people who are interested in finding the best happy hour deals in their area. Could be anyone who enjoys going out for drinks or food with friends or coworkers, but wants to save money.

## 1.4 Requirements: Use Cases and Features

• User location-based search for happy hour deals.
• Filter search by distance, price range, food/drink type (ideally). • Detailed information, including operation hours and ratings.
• Map markers for business offering happy hour deals.

## 1.5 Tech Stack and APIs

• React.js for front-end development.
• Mapbox API for interactive mapping and geolocation (ideally)..
• Material-UI for pre-built design components and styles.
• React Router for client-side routing and navigation.
• Axios for making API requests.
• API keys or token may need it to managed and secured properly.

## Installation

Clone the repository and run npm install to install the dependencies.

### `npm install`

Create a .env file at the root directory of the project with your Mapbox access token, as follows:

REACT_APP_MAPBOX_ACCESS_TOKEN=your_access_token_here

## Usage

Run npm start to start the application, and it will be available at http://localhost:3000.

### `npm start`

## Dependencies

axios: ^0.24.0
mapbox-gl: ^2.4.1
mapbox-gl-controls: ^4.2.0
react: ^17.0.2
react-dom: ^17.0.2
react-scripts: 4.0.3
emotion/react": "^11.10.6",
emotion/styled": "^11.10.6",
material-ui/core": "^4.12.4",
material-ui/icons": "^4.11.3",
mui/icons-material": "^5.11.11",
mui/material": "^5.11.16",
mui/styled-engine-sc": "^5.11.11",
react-md/icon": "^5.1.3",
dotenv": "^16.0.3",
sass": "^1.60.0

## API Reference

Use of Yelp API to fetch data such as image, address, contact number and rating that it's displayed on each card.

## Features

This is a React application that fetches data from a server and displays it on a map. It uses various libraries such as axios for making API requests, mapbox-gl for rendering the map, and mapbox-gl-controls for adding zoom and geolocation controls.

The Home component is the main component of the application. It sets up the map and its controls, fetches data from the server, and renders the Header, Main, and Aside components. It also has state variables to keep track of the selected business, search term, and list of businesses fetched from the server.

The Header component contains a search bar where the user can input a search term. The Main component displays the map, and the Aside component displays a list of businesses fetched from the server that match the search term. The map markers are clickable, and when clicked, the corresponding business is highlighted in the list of businesses in the Aside component where you can get information about either thier drink menu or food menu.

## Next Step

The next step will involve implementing additional features or improving existing ones. This could include adding more search options or filters, integrating with external APIs to provide additional data, improving the user interface, adding authentication or user management functionality, or optimizing the performance of the app. And keeo=p feeding my data with more businesses.
