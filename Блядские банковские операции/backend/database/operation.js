import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OperationModel = new Schema({
    type: {
      required: true,
      type: String,
      enum: ['deposit', 'credit']
    },
    amount: {
      type: String,
      required: true
    },
    month_payment: {
      type: String,
      required: true
    },
    expiration_date: {
      type: Date,
      required: true
    }
});


export default mongoose.model("Operation", OperationModel)