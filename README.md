# Koinoplaza

## [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Koinoplaza is a simple and community-oriented e-commerce application. Like many internet marketplace applications (such as Facebook Marketplace) this app allows users to connect with community members in order to buy and sell products. Where this app differs, however, is in its level of privacy.

In order to buy and sell products, a user must do so in the context of a private community. A user can create communities at will, but in order to join a community, the user must be provided a private key by another user. There is no search function, thus creating a barrier against random users.

The main features of this app include the following:

- Ability to sign up for an account
- Ability to create and join e-commerce communities
- Ability to buy and sell products within those communities
- Ability to pay/receive payment using the Stripe payment processing platform
- Ability to add/remove goods from a ‘Watchlist’, a saved, persistent list of products of interest
- Ability to view a page listing all of user’s own products, as well as saved products
- Ability to view a page for an individual product, with a button to purchase
- Ability to view a page listing communities: those created by user, and those joined by user
- Ability to change user’s settings, including a profile picture

### Technologies

The following technologies and concepts were employed in the creation of this application:

- MERN Stack:
  - Mongo.db ( + Mongoose )
  - Express.js
  - React
  - Node.js
- Stripe payment processing platform
- Apollo Server
- GraphQL
- JSON Web Token (JWT)

### Skills/Concepts

Creating this application relied heavily upon high efficiency in both Front End and Back End skills. A strong database with clearly defined typeDefs and resolvers (query definitions, mutation definitions, etc) lays a crucial foundation for the rest of the application. That database needs to be connected to the server, and authentication is required to make sure that only registered users have access to the appropriate information and client-side elements.

Furthermore, having this solid back end wouldn't mean much if it didn't have a strong front end to connect with. This project relies on a React framework for rendering different pages with components specific to the user that is currently logged in. Rendering the appropriate content on the page requires great attention to detail to how the database is set up, and what kind of queries and mutations are defined in the server side schemas.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [License](#license)

## Installation

**Visit the GitHub repo here:** [REPO](https://github.com/danrcross/koinoplaza)

**Visit the deployed site here:** [SITE](https://koinoplaza.onrender.com)

## Usage

Visit the deployed site as listed above.

Users will be met with a page asking them to log in. If you don't have an account, select the "Sign Up" button underneat the login fields. Enter your information in the associated fields.

Upon creating an account, or logging in, users will be met with a home page. This home page features the user's picture, statistics for their associated products, communities, and rating at the top. Below this, users can see the communities they've joined, the products that they currently have for sale, as well as any products that they've added to their "watch list" (think of this like a wish list; products to eventually buy).

Users can expand any of these categories by clicking the "view more" button underneath the associated section.

To view a single community's page, or a single product's page, click on the box that contains the community or product.

- Upon viewing a single product page, users can save this item to their watchlist, or make a purchase using the "Make Purchase" button.
  - Hitting the "Make Purchase" button will direct users to a secure checkout platform that uses Stripe
- Upon viewing a single community's page, users can see the location and number of members in that community, along with a picture and description
  - Below this are the products a user currently has for sale in the specific community
  - Further down are all of the products available for sale in the community

To create a community, first navigate to your communities. Then select the "+ Create Community" button.

- Enter a community name, location, as well as an image link for the displayed picture of that community

To join a community, select the "+ Join Community" button at the bottom of the page

- NOTE: You must have a community code in order to join a community! This helps ensure that only invited members are able to join.
- Enter the community code in the field, and select "Join Community"

To list a product for sale, select the "+ Add New Product" button after navigating to the "Products" page

- Enter a Name, Price, Condition, Description, as well as an image link for the product you wish to sell
- Then, select "Add Product"

Screenshots:
![alt](filepath)
![alt](filepath)
![alt](filepath)
![alt](filepath)
![alt](filepath)
![alt](filepath)

## License

This application is covered under the [MIT](https://opensource.org/licenses/MIT) license.

## Contributions

This application was designed and created by:

- Daniel Cross
- Ralph Molu
- Michael Pierson
- James Probel

For Contribution inquiries, please use the contact information at the bottom of this document.

## Tests

No tests used for the development of this app!

## Questions

Any Questions? Click a link below to visit my GitHub and/or email me!
For emails, please use this format in the subject line: 'GitHub: {NAME_OF_REPOSITORY}'
[GitHub](https://github.com/danrcross)
[Email](mailto:danrcross@gmail.com)
