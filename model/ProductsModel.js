import mongoose from "mongoose";

/**
 * Defining the Products Schema
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, any, any>}
 */
const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: {true: 'Please provide a name for this product!'},
    minlength: 6
  },
  description: {
    type: String,
    required: {true: "Please provide at least a basic description!"},
    minlength: 6
  },
  purchased_at: {
    type: Number,
    required: {true: "Please provide the price this was purchased at!"}
  },
  sell_at: {
    type: Number,
    required: {true: "Please provide the price you would like to sell this at!"}
  },
  selling_at: {
    type: Number,
    required: {true: "Please provide the current retail price this item is selling at!"}
  },
  retail_link: {
    type: String,
    required: {true: "Please provide a link to this product being sold on a large retail site such as amazon!"}
  },
  stock_quantity: {
    type: Number
  },
  photo_1: {
    type: String,
    required: {true: "Please provide at least one photo!"}
  },
  photo_2: {
    type: String
  },
  photo_3: {
    type: String
  },
  photo_4: {
    type: String
  },
  photo_5: {
    type: String
  },
  photo_6: {
    type: String
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  categories: {
    type: Array
  },
  date_added: {
    type: Date,
    default: Date.now
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
});

/**
 * purchase_at: get
 *
 * Format the purchase at price back to money before returning it.
 */
ProductsSchema.path('purchased_at').get(function(number){
  return (number/100).toFixed(2);
});

/**
 * purchased_at: set
 *
 * Remove dollar formatting before inserting into the database
 */
ProductsSchema.path('purchased_at').set(function(number){
  return number*100;
});

/**
 * sell_at: get
 *
 * Before returning the sell at price format it back to money.
 */
ProductsSchema.path('sell_at').get(function(number){
  return (number/100).toFixed(2);
});

/**
 * sell_at: set
 *
 * Before inserting the sell at price into the database remove the decimal places by multiplying by 100
 */
ProductsSchema.path('sell_at').set(function(number){
  return number*100;
});

/**
 * selling_at: get
 *
 * Before returning the selling at price format it back to money.
 */
ProductsSchema.path('selling_at').get(function(number){
  return (number/100).toFixed(2);
});

/**
 * selling_at: set
 *
 * Before inserting the selling_at value remove the decimal places by multiplying by 100
 */
ProductsSchema.path('selling_at').set(function(number){
  return number*100;
});

/**
 * pre: save
 *
 * This method is triggered on save and sets the last updated date to now and if
 * the date added is not set it will also apply now to that.
 */
ProductsSchema.pre('save', function(next){
  let now = new Date();
  this.last_updated = now;
  if(!this.date_added)
  {
    this.date_added = now;
  }
  next()
})


// Create the model
const ProductsModel = mongoose.model("Products", ProductsSchema);

// Export the Model
export default ProductsModel;