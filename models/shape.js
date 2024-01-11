const mongoose = require('mongoose');

const ShapeSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  details: {
    type: Object,
    properties: {
      shoulder: {
        type: String,
      },
      waist: {
        type: String,
        required: true,
      },
      hips: {
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
      overall: {
        type: String,
      },
      ratio: {
        type: String,
      },
    },
  },
  tricks: {
    type: Object,
    properties: {
      first: {
        type: String,
      },
      second: {
        type: String,
      },
      third: {
        type: String,
      },
    },
  },
  shapeImage: [
    {
      type: String,
    },
  ],
}
)

const Shape = mongoose.model('Shape', ShapeSchema);


module.exports = {
  Shape
};