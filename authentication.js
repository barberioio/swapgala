const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  }
});

const User = mongoose.model('User', UserSchema);

const generateJWTToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  return token;
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Missing required fields.',
    });
  }

  next();
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: 'User not found.',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Invalid password.',
    });
  }

  const token = generateJWTToken(user);

  res.status(200).json({
    message: 'User logged in successfully.',
    token,
    role: user.role,
  });
};

const validateRegister = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Missing required fields.',
    });
  }

  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
    return res.status(400).json({
      message: 'Invalid email address.',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters long.',
    });
  }

  next();
};

const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      message: 'User already exists.',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    role: 'customer',
  });

  await user.save();

  const token = generateJWTToken(user);

  res.status(201).json({
    message: 'User registered successfully.',
    token,
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  const decoded = jwt.decode(req.headers['authorization'].split(' ')[1]);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Token has expired.' });
    } else {
      console.error('Token verification error:', error);
      return res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
};

module.exports = {
  User,
  validateLogin,
  login,
  validateRegister,
  register,
  verifyToken
};
