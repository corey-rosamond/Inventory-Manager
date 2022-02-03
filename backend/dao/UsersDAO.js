import mongoose from 'mongoose';

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
            '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
            "Please provide a valid email"
        ]
    },
    reset_password_token: String,
    reset_password_expire: Date
});

const Users = mongoose.model("Users", UsersSchema)

export default Users;