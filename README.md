# node.js demo

## Instructions

**Create a backend service in node.js that meets the following criteria:**

1. Contains a simple **User** model (you may use the database of your choice).
2. Includes an endpoint that allows API consumers to submit a `POST` request containing a username and password.  If the username and password are valid, the API consumer should receive a valid [JSON Web Token](https://jwt.io/) in the response.
3. Includes a protected endpoint that allows API consumers to submit a `POST` request containing 1 - 2 sentences.  The backend should query the [Sentiment](https://market.mashape.com/vivekn/sentiment-3) API and return the response to the API consumer.  The API consumer must include a valid JWT in order to access this endpoint.

**Create a web front-end in React.js that allows the user to interface with the backend.  No need to make it fancy.  Criteria:**

1. You must use the ES6-style `class` syntax for your components.
2. You must use webpack.
3. Bonus points for using FlowType.

**Overall Requirements:**

1. Includes test coverage.
2. Includes basic documentation.
