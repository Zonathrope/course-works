import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CardModel = new Schema({
    number: {
        required: true,
        unique: true,
        type: Number
    },
    cvv: {
      type: String,
      required: true
    },
    expires: {
      type: Date,
      required: true
    },
    moneyAmount: {
      type: Number,
      required: true,
      default: 0
    },
    type: {
      type: String,
      enum: ['Active', 'Expired']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    deposit: {
      type: Schema.Types.ObjectId,
      ref: "Operation"
    },
    credit: {
      type: Schema.Types.ObjectId,
      ref: "Operation"
    }
});


export default mongoose.model("Card", CardModel)