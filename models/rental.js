const mongoose = require('mongoose');
const { Dress } = require('./dress');
const { User } = require('../authentication');
const { Order } = require('./order');
const { Address } = require('./address');
const jwt = require('jsonwebtoken');

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
      images: [
        {
          type: String,
        },
      ],
      retailPrice: Number,
      size: String,
      totalPrice: Number,
      isRent: Boolean,
    },
  ], 
  totalRentPrice: Number, 
  addressOrder: [
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      mobilePhone: {
        type: Number,
        required: true,
      },
      orderEmail: {
        type: String,
        ref: 'User',
      },
      address: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
      postcode: {
        type: Number,
        required: true,
      },
    }
  ]
});

const Rental = mongoose.model('Rental', RentalSchema);

const saveRental = async (req, res) => {
  const { Items, addressOrder } = req.body;
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

        // Mark the dress as rented
        dress.isRent = true;
        await dress.save();
        dress.images = dress.images.map((image) => image.url);

        rentalItems.push({
          dressId,
          totalDays,
          rentalDate,
          returnDate,
          dressName: dress.DressName,
          dressDescribe: dress.DressDescription,
          images: dress.images[0],
          retailPrice: dress.RetailsPrice,
          size,
          totalPrice: pricePerDay,
          isRent: true,
        });

        totalRentPrice += pricePerDay;
      }

      const newAddress = new Address(addressOrder);
      const savedAddress = await newAddress.save();

      const rentItem = new Rental({
        user: user._id,
        Items: rentalItems,
        addressOrder: savedAddress,
        totalRentPrice
      });

      await rentItem.save();

      const response = {
        message: 'Rent successfully.',
        rentalItems: rentItem.Items,
        addressOrder: savedAddress,
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

    const totalRentPrice = rentals.reduce((total, rental) => total + rental.totalRentPrice, 0);

    if (isNaN(totalRentPrice)) {
      return res.status(400).json({
        message: 'Error calculating the total rent price.',
      });
    }

    const vat = totalRentPrice * 0.07;
    const deposit = totalRentPrice * 0.20;
    const totalPrice = totalRentPrice + vat + deposit;

    const order = new Order({
      user: userId,
      totalPrice: totalPrice,
      isPaid: false,
      isReturn: false
    });
    await order.save();

    res.status(200).json({
      message: 'Rentals successfully.',
      rentals,
      totalPrice, // Send the calculated total rent price in the response
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
