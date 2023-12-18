require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { validateLogin, login, validateRegister, register, verifyToken } = require('./authentication');
const { getDresses, getDressById, getDressByDressCode, addDressStock } = require('./models/dress');
const { saveRental, getRentalsByUser } = require('./models/rental');
const { validateAddress, saveAddress } = require('./models/address');
const { updateOrderPaymentStatus } = require('./models/order');
const { getChatCompletion } = require('./chatbot-config');
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

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

const storage = new Storage({
  projectId: 'able-current-408419',
  keyFilename: 'able-current-408419-2c3806c3c699.json',
});

const bucketName = 'image_able-current-408419';
const bucket = storage.bucket(bucketName);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const fileName = Date.now() + '-' + file.originalname;
    const fileBuffer = file.buffer;

    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ message: 'Error uploading the file' });
    });

    blobStream.on('finish', () => {
      const imageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      res.status(201).json({ message: 'File uploaded successfully', imageUrl });
    });

    blobStream.end(fileBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while uploading the file' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});
