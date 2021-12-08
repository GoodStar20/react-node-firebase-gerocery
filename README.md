# Grocery Store

## Overview

### Back-end

There should be three API endpoints that can be called from a web application.

The three api endpoints should:

- Allow a user to purchase a product model, which should deduct the price from the user’s balance and save the purchase receipt for the user to view later.
  If the product is out of stock, however, the purchase should not occur and an error should be returned.
- Allow a user to view a product model’s variables
- Allow a user to see their user model
  - This includes receipts from their previous purchases

### Front-end

Build a react application that interacts with the Nodejs app developed with the requirements outlined above.

There should be at least two pages that:

- Displays all products
- Shows user info
- Allows user to purchase the product with a button next to the product

## Getting Started

### Install dependencies

```bash
$ cd ./react-node-firebase-grocery/front-end
$ yarn install
```

### Run the App

```bash
$ yarn start
```
