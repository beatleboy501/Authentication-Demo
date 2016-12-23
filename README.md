# node.js demo

## Instructions

Create a backend service in node.js that meets the following criteria:

1. Contains a simple **User** model (you may use the database of your choice)
2. Includes an endpoint that allows API consumers to submit a `POST` request with a username and password.  If the username and password are valid, the API consumer should receive a valid [JSON Web Token](https://jwt.io/).
3. Includes a protected endpoint that allows API consumers to submit a `POST` request containing 1 - 2 sentences.  The backend should query the [Sentiment](https://market.mashape.com/vivekn/sentiment-3) API and return the response to the API consumer.  The API consumer must include a valid JWT in order to access this endpoint.
4. Includes test coverage.
5. Includes basic documentation.
