const mongoose = require('mongoose');

const DressSchema = new mongoose.Schema({
  DressCode: {
    type: String,
    required: true,
  },
  DressName: {
    type: String,
    required: true,
  },
  DressDescription: {
    type: String,
    required: true,
  },
  PriceForRent4Days: {
    type: Number,
    required: true,
  },
  PriceForRent8Days: {
    type: Number,
    required: true,
  },
  RetailsPrice: {
    type: Number,
    required: true,
  },
  size: [
    {
      type: String,
      required: true,
    },
  ],
  RecommendFromStylish: {
    type: String,
    required: true,
  },
  Fit: {
    type: Object,
    required: true,
    properties: {
      model: {
        type: String,
        required: true,
      },
      height: {
        type: String,
        required: true,
      },
      bust: {
        type: String,
        required: true,
      },
      waist: {
        type: String,
        required: true,
      },
      hips: {
        type: String,
        required: true,
      },
      undergarments: {
        type: String,
        required: true,
      },
      fabric: {
        type: String,
        required: true,
      },
      length: {
        type: String,
        required: true,
      },
      greatFor: {
        type: String,
        required: true,
      },
    },
  },
  Details: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  isRent: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  occasion: {
    type: String,
    required: true,
  }

});

const Dress = mongoose.model('Dress', DressSchema);

const getDresses = async (req, res) => {

  try {
    const filters = {};

    const { color, size, minPrice, maxPrice, occasion } = req.query;

    if (color) {
      filters.color = color;
    }

    if (size) {
      filters.size = { $in: size };
    }

    if (minPrice && maxPrice) {
      filters.PriceForRent4Days = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    } else if (minPrice) {
      filters.PriceForRent4Days = { $gte: parseInt(minPrice) };
    } else if (maxPrice) {
      filters.PriceForRent4Days = { $lte: parseInt(maxPrice) };
    }

    if (occasion) {
      filters.occasion = occasion;
    }

    const dresses = await Dress.find(filters);

    res.status(200).json(dresses);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching dresses.',
    });
  }
};

const getDressById = async (req, res) => {
  try {
    const dressId = req.params.id;
    const dress = await Dress.findById(dressId);

    if (!dress) {
      return res.status(404).json({
        message: 'Dress not found. Please check the ID.',
      });
    }

    res.status(200).json(dress);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching the dress.',
    });
  }
};

const getDressByDressCode = async (req, res) => {
  const dressCode = req.params.DressCode; 

  const dress = await Dress.findOne({ DressCode: dressCode });

  if (!dress) {
    return res.status(404).json({
      message: 'Dress not found. Please check the DressCode.',
    });
  }

  dress.images = dress.images.map((image) => image.url);

  res.status(200).json(dress);
};

module.exports = {
  Dress,
  getDresses,
  getDressById,
  getDressByDressCode,
};

