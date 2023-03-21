/*  
  This is a React component that renders a form with a textarea input for the user to type in a message. 
  When the user submits the form, the component sends a POST request to a server running at localhost:3001, 
  passing along the message as a JSON string in the request body. 
  The server returns a JSON response with a "message" field, which is then displayed in a box below the form. 
  The component uses the useState() hook to maintain the state of the message and response variables. 
  The handleSubmit function is called when the form is submitted and uses the fetch() API to send the HTTP request. 
  The message variable is updated with the value of the textarea input using the onChange event.
*/

import React, {useState} from 'react';
import './App.css';

function App() {

  // Define the state variables for message and response using the useState() hook
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  // Function that gets called when the user submits the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send an HTTP request using fetch()
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Package the data as a JSON string in the request body
      body: JSON.stringify({message})
    })
    .then((res) => res.json()) // Extract JSON content from the response
    .then((data) => { // Update response with the message field from the JSON content
      setResponse(data.response)
      console.log(response)
    }) 
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} cols="30" rows="10">
        </textarea>
        <button type='submit'>Submit</button>
      </form>
      {/* <div>Response: {response.message}</div>
      <div>Analysis: {response.analysis}</div>
      <div>Correction: {response.correction}</div> */}

    </div>
  );

}

export default App;







