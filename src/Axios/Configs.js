const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post('/login', (req, res) => {
  // Check credentials and perform authentication logic
  const { username, password } = req.body;

  if (username === 'yourUsername' && password === 'yourPassword') {
    // Authentication successful, generate a token
    const authToken = 'yourAuthToken';

    // Send the token back to the client
    res.cookie('authToken', authToken, { httpOnly: true });
    res.json({ success: true, message: 'Login successful', token: authToken });
  } else {
    // Authentication failed
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});









// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [token, setToken] = useState(null);

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/login', credentials);

//       if (response.data.success) {
//         // Login successful, retrieve the token from the server response
//         const authToken = response.data.token;

//         // Store the token in state or wherever you need it
//         setToken(authToken);

//         // Do something with the token (e.g., send it with future requests)
//         console.log('Token:', authToken);
//       } else {
//         // Login failed, handle it accordingly
//         console.error('Login failed');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={credentials.username}
//           onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={credentials.password}
//           onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//         />
//       </div>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;
