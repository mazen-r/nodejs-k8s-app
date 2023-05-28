# Scalable Node.js Blog App

## Tech:
- NodeJS/ExpressJS
- Bcryptjs
- Winston
- Zod
- Swagger
- Twilio
- PostgreSQL/Sequelize
- Jest
- Redis
- Docker
- Kubernetes
- Prometheus
- Grafana
- GitHub Actions


## System Architecture

[![System Architecture](https://github.com/mazen-r/nodejs-backend/blob/master/.github/docs/server-architecture.png)](https://github.com/mazen-r/nodejs-backend/blob/master/.github/docs/server-architecture.png)
## Server Architecture

[![Server Architecture](https://github.com/mazen-r/nodejs-backend/blob/master/.github/docs/system-architecture.png)](https://github.com/mazen-r/nodejs-backend/blob/master/.github/docs/system-architecture.png)

## Database
- The server is using PostgreSQL with Sequelize as an ORM.
## Overview
### User
- The app allows users to perform CRUD operations, where they can later interact with posts and comments.
### Post
- An authorised user can perform CRUD operations on posts.
- A user can have many posts via a One-To-Many relationship between user and post.
- A post is referred to the user using the authorId as a foreign key.
### Comment
- An authorised user with a verified profile can perform CRUD operations on comments.
- A post can have many comments via a One-To-Many relationship between post and comment.
- A comment is referred to the user using the authorId as a foreign key and to the post using the postId as a foreign key.
### Authentication and Authorization
- Users are authenticated using JWTs, where a token is created when a user logs-in with valid credentials. Passwords are also encrypted using Bcrypt.  
- Authorization is managed using a middleware with the following roles:  
    - Logged-in user:  
        - This permission allows users to perform CRUD operations on both users and posts endpoints.  
    - Logged-in user with a verified profile:  
        - A verified user only can perform CRUD operations on comments. A user can get verified by adding a valid phone number and verifying it using Twilio.  
> **Note that the GET endpoints doesn't require authorization.**  
### Validation  
- Data input is validated using a validation middleware that's built using Zod.
### Caching
- Redis is used as a caching middleware for the GET endpoinst. The middleware defines the Redis key using the URL of the route, then the middleware returns the cached data if available, otherwise, the request proceeds to the controller, where the key passed from the middleware gets assigned to a value.
### Rate Limiting
- Express-rate-limiter is used as a rate-limiting middleware for all endpoints. The middleware creates a timeout after sending 100 requests from the same IP address during a 5-minute window.
### Logging
- All requests are logged using Winston. The logs contain all headers and status codes of the request.
### Notifications
- Twilio is used as a notification system when requesting the verification endpoint.
### Documentation
- All APIs are documented using Swagger, located at the `/api-docs` endpoint.
- Note that a Postman collection is also provided at the end of this document.
### Tests
- Integration tests are implemented using Jest, where it is also used in the CI pipeline.
- The integration tests don't cover all the app, additional types of tests should be added.
### Docker
- The application can run under development mode using Nodemon with Docker. The docker-compose contains all services used, including PostgreSQL, Redis, Prometheus and Grafana.
### Kubernetes
- The server can be horizontally scaled automatically using k8s load balancer service.
- PostgreSQL runs under k8s which isn't recommended for production as databases are stateful, which contravenes the statless nature of k8s. A managed database service outside k8s would be better to scale up the database.
### Monitoring
- Prometheus  
    - Prometheus is used to monitor the performance and health of the APIs. It creates statistical insights about the app's performance, including histograms, summaries and counters.  
    - Prometheus produces all insights at the `/metrics` endpoint, where they are used by Grafana.
    - Proetheus is available at port 9090.
- Grafana  
    - Grafana scrapes insights from Prometheus, where they get visualised using graphs and dashboards.
    - Grafana is available at port 3000.
### Continious Integration
- The app is using GitHub actions to create a CI pipeline.
- The CI pipeline is defined by a workflow triggered on pushes and PRs into the master branch, where it uses tests to perform checks.
## How to run the app
Make sure to add a .env file to the src directory, you can check the .env.example file for a reference.
### On Docker
- You can spin up all services used by running/building the docker-compose file:  
`docker-compose up --build`
- The default behaviour of running the app on Docker is in development mode. The server container will automatically restart on code changes.
### On Kubernetes
- You need to have Minikune and Kubectl installed on your machine.
- All deployements and services files are defined in a k8s kustomization file, which you can run using a single command:  
`kubectl apply -k kubernetes`
> **Note that kubernetes in the command refers to the folder that contains the kustomization file.**
- K8s ingress controller hasn't been defined yet. So in order to expose the app, you need to forward it using the following command:  
`kubectl port-forward service/blog-app 8000:80`


### Postman Collection
- You can find a postman collection for the API endpoimts [here](https://github.com/mazen-r/nodejs-backend/blob/master/.github/docs/Blog-App.postman_collection.json).
