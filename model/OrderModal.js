import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    products: [
      {
        product_id: {
          type: String
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    order_total: {
      type: Number
    },
    shipping_address: {
      type: Object
    },
    status: {
      type: String,
      default: "pending"
    }
  },
  {timestamps: true}
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;