require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { validateLogin, login, validateRegister, register } = require('./authentication'); // Assuming your authentication code is in 'auth.js'
const { getDresses, getDressById, getDressByDressCode } = require('./models/dress');
const { saveRental, getRentalsByUser } = require('./models/rental');
const { validateAddress, saveAddress } = require('./models/address')
const { updateOrderPaymentStatus } = require('./models/order')
 
const app = express();
const port = process.env.PORT || 3000;

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

app.post('/rent/:id', saveRental);

app.get('/order/:id', getRentalsByUser)

app.post('/address', validateAddress, saveAddress);

app.put('/update/:id', updateOrderPaymentStatus)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});
