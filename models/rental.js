const mongoose = require('mongoose');
const { Dress } = require('./dress');
const { User } = require('../authentication');
const { Order } = require('./order');
const { Address } = require('./address');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const RentalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  Items: [
    {
      dressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dress',
        required: true,
      },
      totalDays: {
        type: Number,
        required: true,
      },
      rentalDate: {
        type: Date,
        required: true,
      },
      returnDate: {
        type: Date,
        required: true,
      },
      dressName: String,
      dressDescribe: String,
      retailPrice: Number,
      size: String,
      totalPrice: Number,
      isRent: Boolean, // Added a field to store whether the dress is rented
    },
  ],  
  addressOrder: {
    type: String,
    require: true,
    ref: 'Address'
  }
});

const Rental = mongoose.model('Rental', RentalSchema);

const saveRental = async (req, res) => {
  const { Items } = req.body;
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

    if (Items.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty. Please add items to your cart before renting.',
      });
    }

    try {
      const rentalItems = [];
      let totalRentPrice = 0;

      for (const item of Items) {
        const { dressId, totalDays, rentalDate, returnDate, size } = item;
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

        dress.isRent = true; // Mark the dress as rented
        await dress.save();

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
        
        // Add the dress item to rentalItems array
        rentalItems.push({
          dressId,
          totalDays,
          rentalDate,
          returnDate,
          dressName: dress.DressName,
          dressDescribe: dress.DressDescription,
          retailPrice: dress.RetailsPrice,
          size,
          totalPrice: pricePerDay,
          isRent: true,
        });

        totalRentPrice += pricePerDay;
      }

      // Create a Rental item with the array of dress items
      const rentItem = new Rental({
        user: user._id,
        Items: rentalItems, // Add the array of dress items
      });

      await rentItem.save();

      // Prepare the response JSON in the desired format
      const response = {
        message: 'Rent successfully.',
        rentalItems: rentItem.Items,
        totalRentPrice,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'An error occurred while registering the rentals.',
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
  saveRental,
  getRentalsByUser,
  Rental,
};
