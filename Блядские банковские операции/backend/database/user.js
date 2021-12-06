import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserModel = new Schema({
    fname: {
      required: true,
      type: String
    },
    lname: {
      required: true,
      type: String
    },
    email:{
      required: true,
      unique: true,
      type: String
    },
    password: {
      required: true,
      type: String
    },
    status: {
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    confirmationCode: {
      type: String,
      unique: true
    }
});


export default mongoose.model("User", UserModel)