import mongoose from 'mongoose';

/**
 * Category Schema
 *
 * This is the basic Category schema every product will belong to one or more of these.
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, any, any>}
 */
const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String,
      required: true,
      default: "An amazing category description"
    },
    color: {
      type: String,
      required: true,
      default: "#000000"
    },
    uri: {
      type: String,
      unique: true,
      required: true
    },
    image: {
      type: String,
      required: true,
      default: ""
    }
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", CategorySchema);

export default CategoryModel;