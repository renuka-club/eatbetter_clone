const Order = require('../models/Order');
const Payment = require('../models/Payment');

exports.createPaymentRecord = async (paymentDetails) => {
  try {
    const payment = new Payment({
      orderId: paymentDetails.orderId,
      razorpayPaymentId: paymentDetails.razorpay_payment_id,
      razorpayOrderId: paymentDetails.razorpay_order_id,
      razorpaySignature: paymentDetails.razorpay_signature,
      amount: paymentDetails.amount,
      status: 'completed'
    });

    await payment.save();
    
    // Update order status
    await Order.findByIdAndUpdate(paymentDetails.orderId, {
      paymentStatus: 'paid',
      paymentId: payment._id
    });

    return payment;
  } catch (error) {
    console.error('Error creating payment record:', error);
    throw error;
  }
};