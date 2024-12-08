import mongoose from "mongoose";
const {Schema, model} = mongoose;

const UserSchema = new Schema(
    {
    firstName:{type: String, required: true, min: 4},
    lastName:{type: String, required: true, min: 4},
    email:{type: String, required: true, min: 4, unique: true},
    password:{type: String, required: true},
    checkPassword:{type: String, required: true},
    preference1: { type: String },
    preference2: { type: String },
    preference3: { type: String },
    preLanguage: { type: String },
    socialLinks: { type: String },
    },
    { collection: "movieMindsUsers" }
);

const UserModel = model('User', UserSchema);

export default UserModel;