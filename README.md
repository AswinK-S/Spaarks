# Restaurant Locator API

This Docker image provides a RESTful API built with Node.js, Express.js, and MongoDB. The API offers functionality for managing restaurants and performing geospatial queries, with authentication features for both admin and user roles.

## Features

### Admin Operations

- **CRUD Operations:** Authenticated admins can perform Create, Read, Update, and Delete operations on restaurant records. Each record includes details such as name, description, location coordinates (latitude and longitude), and ratings.

### User Operations

- **Geospatial Queries:** Authenticated users can query restaurants based on:
  - Latitude and longitude with a specified radius, sorted from nearest to farthest.
  - Latitude and longitude with a specified radius range.

## Configuration

### MongoDB Atlas

The application connects to MongoDB Atlas for database operations. The connection URI and other sensitive configuration details are stored in a `.env` file.

## How to Run

### Prepare Environment Variables

Create a `.env` file in the root directory of your project with the following content:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret

Replace <username>, <password>, <database>, and your_jwt_secret with your MongoDB Atlas credentials and JWT secret.

### Build the Docker Image
If you haven't already built the Docker image, do so with:

docker build -t your-dockerhub-username/your-repository-name:tag .

### Push the Docker Image (if needed)
If you haven’t pushed the image yet, tag and push it to Docker Hub:

docker tag your-image-name your-dockerhub-username/your-repository-name:tag
docker push your-dockerhub-username/your-repository-name:tag

### Run the Docker Container
Start a new container from the image:

docker run -d -p 5000:5000 --name your-container-name --env-file .env your-dockerhub-username/your-repository-name:tag


Memory updated
Here's your overview converted into a README.md file for GitHub:

markdown
Copy code
# Restaurant Locator API

This Docker image provides a RESTful API built with Node.js, Express.js, and MongoDB. The API offers functionality for managing restaurants and performing geospatial queries, with authentication features for both admin and user roles.

## Features

### Admin Operations

- **CRUD Operations:** Authenticated admins can perform Create, Read, Update, and Delete operations on restaurant records. Each record includes details such as name, description, location coordinates (latitude and longitude), and ratings.

### User Operations

- **Geospatial Queries:** Authenticated users can query restaurants based on:
  - Latitude and longitude with a specified radius, sorted from nearest to farthest.
  - Latitude and longitude with a specified radius range.

## Configuration

### MongoDB Atlas

The application connects to MongoDB Atlas for database operations. The connection URI and other sensitive configuration details are stored in a `.env` file.

## How to Run

### Prepare Environment Variables

Create a `.env` file in the root directory of your project with the following content:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
Replace <username>, <password>, <database>, and your_jwt_secret with your MongoDB Atlas credentials and JWT secret.

### Build the Docker Image
If you haven't already built the Docker image, do so with:


docker build -t your-dockerhub-username/your-repository-name:tag .
Push the Docker Image (if needed)
If you haven’t pushed the image yet, tag and push it to Docker Hub:


docker tag your-image-name your-dockerhub-username/your-repository-name:tag
docker push your-dockerhub-username/your-repository-name:tag
Run the Docker Container
Start a new container from the image:


docker run -d -p 5000:5000 --name your-container-name --env-file .env your-dockerhub-username/your-repository-name:tag
--env-file .env loads environment variables from the .env file into the container.

### Access the API
The API will be accessible at http://localhost:5000. Use tools like Postman or cURL to interact with the API endpoints.

### Authentication
Admin Authentication
Create an admin with email and password in MongoDB and log in with those credentials to access admin features for managing restaurant records.

### User Authentication
1.Register a user using:
POST http://localhost:5000/user/register
with the following:
{
  "name": "your_name",
  "email": "your_email",
  "password": "your_password"
}

2.Log in with the credentials to access the restaurant queries using longitude, latitude, and range.