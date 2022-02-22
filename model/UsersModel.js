import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

/**
 * Defining the Users Schema
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, any, any>}
 */
const UsersSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: {true: 'Please provide a username!'},
        unique: true
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
    is_admin: {
        type: Boolean,
        default: false
    },
    reset_password_token: String,
    reset_password_expire: Date,
    },
  {timestamps: true}
);

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
    if(!this.password)
    {
        return false;
    }
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
        {
            id: this._id,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    );
}

/**
 * Get Reset Password Token
 *
 * This will generate a password reset token in the user document and set the
 * password reset expire to the amount of minutes from now defined in the JWT_EXPIRE
 * env variable.
 * @returns {string}
 */
UsersSchema.methods.getResetPasswordToken = function()
{
    let reset_token = crypto.randomBytes(20).toString("hex");
    this.reset_password_token = crypto
        .createHash("sha256")
        .update(reset_token)
        .digest("hex");

    this.reset_password_expire = Date.now() + parseInt(process.env.JWT_EXPIRE) * (60 * 1000);

    return reset_token;
}

// Create the model
const UsersModel = mongoose.model("Users", UsersSchema);

// Export the Model
export default UsersModel;