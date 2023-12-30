  
  // const express = require('express');
  // const bodyParser = require('body-parser');
  // const cors = require('cors');
  
  
  // const app = express();
  // const port = 3000;
  
  // // Enable CORS for all routes
  // app.use(cors());
  
  // // Body parser middleware to parse JSON
  // app.use(bodyParser.json());
  
  // // Sample user data (replace with a database in a real-world scenario)
  // const users = [
  //   { id: 1, username: 'user1', password: 'password1' },
  //   { id: 2, username: 'user2', password: 'password2' },
  // ];
  
  // // API endpoint for user sign-in
  // app.post('/api/signin', (req, res) => {
  //   const { username, password } = req.body;
  
  //   // Check if the provided credentials are valid (replace with actual authentication logic)
  //   const user = users.find((u) => u.username === username && u.password === password);
  
  //   if (user) {
  //     res.json({ success: true, message: 'Authentication successful' });
  //   } else {
  //     res.status(401).json({ success: false, message: 'Invalid credentials' });
  //   }
  // });
  
  // // Start the server
  // app.listen(port, () => {
  //   console.log(`Server is running on http://127.0.0.1:${port}`);
  // });
  
  
  
  

  
  const express = require('express');
const bodyParser = require('body-parser');



const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;

  // Implement your authentication logic here (dummy example)
  if (username === 'user' && password === 'password') {
    res.json({ success: true, message: 'Authentication successful' });
  } else {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
