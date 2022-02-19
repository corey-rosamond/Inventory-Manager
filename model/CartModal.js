import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    user_id:{
      type: String,
      required: true
    },
    products: [
      {
        product_id: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", CartSchema);

export default CartModel;