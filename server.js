/*
    This is an Express server that has been created to handle incoming API requests and respond with a JSON object. 
    It uses the "body-parser" package to handle incoming data and the "cors" package to allow cross-origin requests. 
    The server is built using Node.js, a JavaScript runtime based on the Google Chrome V8 engine that allows you to 
    execute server-side JavaScript code.
*/

/* 
    The "body-parser" middleware is used to parse the incoming HTTP request body. For example, if an HTTP 
    request contains data sent through the POST or PUT method, the "body-parser" middleware parses the request 
    body and makes it available as a JSON object so that it can be easily manipulated by the application code. 
    This middleware can be configured to parse the request body in various formats such as JSON, URL-encoded, 
    XML, and others.
/*

/*
    The "cors" middleware is used to enable cross-origin HTTP requests (CORS - Cross-Origin Resource Sharing). 
    CORS is a security measure implemented in web browsers to prevent cross-site scripting (XSS) and cross-site 
    request forgery (CSRF) attacks. The "cors" middleware is very useful for allowing your web applications to 
    accept HTTP requests from domains other than your own. Without the "cors" middleware, the browser 
    automatically blocks these requests for security reasons. For example, if you are writing an API and a client 
    tries to make an HTTP request to your server from a different domain, the browser will block the request. 
    In this case, the "cors" middleware can be used to configure the application to accept requests from other 
    domains. This way, your application can function properly and communicate with other applications and 
    servers without security issues.   
*/


const express = require('express'); // Import the express library
const bodyParser = require('body-parser'); // Import the body-parser library
const cors = require('cors'); // Import the cors library
const app = express(); // Create an instance of the express application
const port = 3000; // Set the port number for the server to listen on

app.use(bodyParser.json()); // Use the body-parser middleware to parse incoming JSON data
app.use(cors()); // Use the cors middleware to enable cross-origin resource sharing

app.get('/', (req, res) => { // Define a route for handling HTTP GET requests to the root URL
    res.send('Hello World!'); // Send a response containing the string "Hello World!"
});

app.listen(port, () => { // Start the server and listen for incoming requests on the specified port
    console.log('Example app listening'); // Print a message to the console to indicate that the server is running
});


