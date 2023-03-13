/* 
  A react component that inputs a textarea message the performs a fetch request to localhost:3001 
  gets back a response as a data.message and displays that message in a box below  
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
    'Content-type': 'application/json',
    },
    // Package the data as a JSON string in the request body
    body: JSON.stringify({message})
    })
    .then((res) => res.json()) // Extract JSON content from the response
    .then((data) => setResponse(data.message)) // Update response with the message field from the JSON content
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} cols="30" rows="10">
        </textarea>
        <button type='submit'>Submit</button>
      </form>
      <div>{response}</div>
    </div>
  );

}

export default App;







