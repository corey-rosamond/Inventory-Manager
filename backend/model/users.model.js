import mongoose from 'mongoose';
import bcrypt from "bcrypt";

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

UsersSchema.methods.matchPassword = async function(password)
{
    return await bcrypt.compare(password, this.password);
}

const UsersModel = mongoose.model("Users", UsersSchema);

export default UsersModel;