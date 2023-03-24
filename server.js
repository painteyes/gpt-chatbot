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

// Import the 'openapi' module and extract the Configuration and OpenAIApi classes from it
const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI

// Loads environment variables from a .env file
require('dotenv').config();

// Create a new Configuration object with the organization and API key values
const configuration = new Configuration({
    organization: "org-tA7y3eMqQFl9obw1prqIl0Tq",
    apiKey: process.env.OPENAI_API_KEY,
});

// Create a new OpenAIApi object using the Configuration object created above
const openai = new OpenAIApi(configuration);

const express = require('express'); // Import the express library
const bodyParser = require('body-parser'); // Import the body-parser library
const cors = require('cors'); // Import the cors library
const app = express(); // Create an instance of the express application
const port = 3001; // Set the port number for the server to listen on

app.use(bodyParser.json()); // Use the body-parser middleware to parse incoming JSON data
app.use(cors()); // Use the cors middleware to enable cross-origin resource sharing

/*
    The app.get() / app.post() methods are used to create a route for the HTTP GET / POST request method. 
    The string passed as the first argument to app.get() / app.post() represents the URL path of the route.
    The function passed as the second argument to app.get() / app.post() is known as the route handler. 
    This function takes two arguments, req and res.
    - req stands for request and it contains information about the incoming HTTP request, 
    such as the headers, parameters, and body of the request.
    - res stands for response and it contains methods to send a response back to the client, 
    such as res.send() to send a plain text response, or res.json() to send a JSON response.
*/


app.post('/', async (req, res) => { // Define a route for handling HTTP GET requests to the root URL
    const inputMessage = await req.body.message;
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `  
            Provide an API response message to the "${inputMessage}" input message.
            Analyze the "${inputMessage}" input message for any grammatical errors.
            If there are errors, provide the following output: <API response>|<correction suggestion>|<error explanation>
            If there are no errors, provide the following output: <API response>|null|null
        `,
        max_tokens: 1024,
        temperature: 0.4,
        stop: "\n\n",
    });

    console.log(completion.data.choices[0].text)
    const response = completion.data.choices[0].text.trim().split("|");
    const message = response[0]?.trim() || "";
    const analysis = response[1]?.trim() || "";
    const correction = response[2]?.trim() || "";
    const responseObject = {message, analysis, correction}
    // res.json({response: responseObject})
});

app.listen(port, () => { // Start the server and listen for incoming requests on the specified port
    console.log('Server listening on port:', port); // Print a message to the console to indicate that the server is running
});





