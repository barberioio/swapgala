const mongoose = require('mongoose');
const { Dress } = require('./dress');
const { User } = require('../authentication');
const { Order } = require('./order');
const jwt = require('jsonwebtoken');

const RentalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  dress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dress',
  },
  dressName: String,        
  dressDescribe: String,   
  retailPrice: Number,      
  sizeRent: String,         
  confirm: Boolean,
  totalDays: Number,
  rentalDate: Date,
  returnDate: Date,
  totalPrice: Number,
});

const Rental = mongoose.model('Rental', RentalSchema);

const saveRental = async (req, res) => {
  const dressId = req.params.id;
  const { confirm, totalDays, rentalDate, returnDate, size } = req.body;
  const token = req.headers['authorization'].split(' ')[1];
  const decoded = jwt.decode(req.headers['authorization'].split(' ')[1]);
  const user = await User.findById(decoded.id);

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized. Please log in first.',
    });
  }

  if (!user) {
    return res.status(401).json({
      message: 'User not found.',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized. Invalid token.',
        token,
      });
    }
    if (confirm === true) {
      try {
        const dress = await Dress.findById(dressId);
        if (!dress) {
          return res.status(404).json({
            message: 'Dress not found. Please check the ID.',
          });
        }

        if (!dress.size.includes(size)) {
          return res.status(400).json({
            message: 'Invalid size. Size not available for this dress.',
          });
        }

        let pricePerDay;
        if (totalDays === 4) {
          pricePerDay = dress.PriceForRent4Days;
        } else if (totalDays === 8) {
          pricePerDay = dress.PriceForRent8Days;
        } else {
          return res.status(400).json({
            message: 'Total days must be either 4 or 8.',
          });
        }

        const indexOfSize = dress.size.indexOf(size);
        if (indexOfSize !== -1) {
          dress.size.splice(indexOfSize, 1);
          await dress.save();
        } else {
          return res.status(400).json({
            message: 'Size not available for this dress.',
          });
        }

        // Create the Rental
        const rentItem = new Rental({
          user: user._id,
          dress: dressId,
          dressName: dress.DressName,
          dressDescribe: dress.DressDescription,
          retailPrice: dress.RetailsPrice,
          sizeRent: size,
          confirm,
          totalDays,
          rentalDate,
          returnDate,
          totalPrice: pricePerDay,
        });

        await rentItem.save();

        res.status(201).json({
          message: 'Rent successfully.',
          rentItem
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'An error occurred while registering the rental.',
        });
      }
    } else {
      res.status(400).json({
        message: 'Confirmation is required to register a rental.',
      });
    }
  });
};

const getRentalsByUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const rentals = await Rental.find({ user: userId });

    if (rentals.length === 0) {
      return res.status(404).json({
        message: 'No rentals found for the user.',
        rentals
      });
    }

    const totalRentPrice = rentals.reduce((total, rental) => total + rental.totalPrice, 0);

    const order = new Order({
      user: userId,
      totalPrice: totalRentPrice,
      isPaid: false,
      isReturn: false
    });
    await order.save();
    

    res.status(200).json({
      message: 'Rentals successfully.',
      rentals,
      totalRentPrice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while fetching rentals.',
    });
  }
};

module.exports = {
  Rental,
  saveRental,
  getRentalsByUser,
};
