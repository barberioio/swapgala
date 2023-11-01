require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { validateLogin, login, validateRegister, register, verifyToken } = require('./authentication');
const { getDresses, getDressById, getDressByDressCode } = require('./models/dress');
const { saveRental, getRentalsByUser } = require('./models/rental');
const { validateAddress, saveAddress } = require('./models/address');
const { updateOrderPaymentStatus } = require('./models/order');
const { getChatCompletion } = require('./chatbot-config');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:1234@swapgala.hzxwq9h.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// API endpoints
app.post('/login', validateLogin, login);
app.post('/register', validateRegister, register);

app.get('/dress', getDresses);
app.get('/dress/:id', getDressById);
app.get('/dress/item/:DressCode', getDressByDressCode);

app.post('/rent', saveRental);

app.get('/order/:id', getRentalsByUser);

app.post('/address', validateAddress, saveAddress);

app.put('/update/:id', updateOrderPaymentStatus);

app.get('/user', verifyToken, (req, res) => {
  const { id, email } = req.user;

  res.status(200).json({
    id,
    email,
  });
});

app.post('/chat', getChatCompletion);

// app.get('/recommend', async (req, res) => {
//   try {
//     const userResponses = req.query.responses || req.body.responses;

//     const recommendations = await getChatCompletion({ message: userResponses });

//     res.json({ recommendations });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while recommending a dress.' });
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});
