Simple Express API

This is a basic Express application that provides simple arithmetic operations through API endpoints. It demonstrates how to create a server, define routes, and process HTTP requests using Express.

Project Structure

server.js: The entry point to the application that sets up the Express server and integrates the routes.
routes.js: A separate file that defines the routes for different arithmetic operations (addition, subtraction, and multiplication).
Features
Addition: Adds two numbers.
Subtraction: Subtracts the second number from the first number.
Multiplication: Multiplies two numbers.
Getting Started
To get started, follow these steps:

Prerequisites

Make sure you have Node.js and npm installed on your system. You can check if you have them installed by running:

node -v
npm -v
If not, install Node.js from here.

Installation
Clone the repository or download the project files.

Navigate to the project directory:


cd /path/to/your/project
Install the dependencies:


npm install
Running the Server
To start the server, run:


npm start
This will start the server on http://localhost:3000.

API Endpoints
The following API endpoints are available:

GET /addTwoNumbers

Description: Adds two numbers.
Parameters: number1 and number2 as query parameters (e.g., /addTwoNumbers?number1=5&number2=10).
Response: JSON object with the result of the addition.
Example request:


GET /addTwoNumbers?number1=5&number2=10
POST /subtractTwoNumbers

Description: Subtracts the second number from the first number.
Parameters: number1 and number2 as query parameters (e.g., /subtractTwoNumbers?number1=10&number2=5).
Response: JSON object with the result of the subtraction.
Example request:


POST /subtractTwoNumbers?number1=10&number2=5
PUT /multiplyTwoNumbers

Description: Multiplies two numbers.
Parameters: number1 and number2 as query parameters (e.g., /multiplyTwoNumbers?number1=5&number2=10).
Response: JSON object with the result of the multiplication.
Example request:


PUT /multiplyTwoNumbers?number1=5&number2=10
Example Responses
For successful operations, the server will return a response in the following format:

{
  "status": 200,
  "data": 15,  // Result of the operation
  "message": "success"
}

In the case of subtraction, it might return a status code of 201.

CORS
This application uses the cors middleware to allow cross-origin requests.

Conclusion
This basic Express server demonstrates how to handle basic arithmetic operations with HTTP methods (GET, POST, PUT) and how to organize routes in a modular way. You can easily extend this project by adding more routes for additional arithmetic operations or any other functionality you need.

