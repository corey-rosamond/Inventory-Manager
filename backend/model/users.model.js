import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

/**
 * Defining the Users Schema
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, any, any>}
 */
const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: {true: 'Please provide a username!'}
    },
    password: {
        type: String,
        required: {true: 'Please provide a password'},
        minlength: 6,
        select: false
    },
    email_address: {
        type: String,
        required:{true: 'Please provide a email address!'},
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    reset_password_token: String,
    reset_password_expire: Date
});

/**
 * This method tells mongoose that before we save a password
 * check if it was modified. If it was modified then generate a
 * new salt and rehash.
 */
UsersSchema.pre(
    "save",
async function(next){
        if(!this.isModified("password"))
        {
            next();
        }
        let salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
);

/**
 * Match Password
 *
 * This method will determine if a user password provided
 * matches the user objects password.
 * @param password
 * @returns {Promise<void|*>}
 */
UsersSchema.methods.matchPassword = async function(password)
{
    return await bcrypt.compare(password, this.password);
}

/**
 * Get Signed Token
 *
 * This will get and return a signed token.
 * @returns {*}
 * @todo look into why jwt is saying it needs 4 parameters.
 */
UsersSchema.methods.getSignedToken = function()
{
    return jsonwebtoken.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    );
}

// Create the model
const UsersModel = mongoose.model("Users", UsersSchema);

// Export the Model
export default UsersModel;