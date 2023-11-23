const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental',
  },
  totalPrice: Number,
  isPaid: Boolean,
  isReturn: Boolean,
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', OrderSchema);

const updateOrderPaymentStatus = async (req, res) => {
  const rentId = req.params.id;
  const { isPaid, isReturn } = req.body;

  try {
    const existingOrder = await Order.findOne({rentId:rentId});

    if (!existingOrder) {
      return res.status(404).json({
        message: 'Order not found.',
      });
    }

    if (isPaid !== '') {
      existingOrder.isPaid = isPaid;
    }

    if (isReturn !== '') {
      existingOrder.isReturn = isReturn;
    }

    const updatedOrder = await existingOrder.save();

    return res.status(200).json({
      message: 'Payment status updated successfully.',
      isPaid: updatedOrder.isPaid,
      isReturn: updatedOrder.isReturn
    });
  } catch (error) {
    console.error('An error occurred while updating the payment status:', error);
    return res.status(500).json({
      message: 'An error occurred while updating the payment status.',
    });
  }
};

module.exports = {
  Order,
  updateOrderPaymentStatus,
};
