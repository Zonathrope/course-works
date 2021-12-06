import CardModel from '../database/card.js'
import UserModel from '../database/user.js'
import OperationModel from '../database/operation.js'
import Mailer from '../mail/mail.js'
import { generateRandomNumb } from '../Util/Util.js'
import { FOUR_YEARS_IN_MS, MONTH_IN_MS } from '../constants/constants.js'
import { OPERATIONS } from '../types/types.js'

class CardService {
  async create({ userID }) {
    const cvv = generateRandomNumb(3)
    const number = generateRandomNumb(16)
    // expires in 4 years
    const expires = Date.now() + FOUR_YEARS_IN_MS
    return CardModel.create({ number, cvv, expires, user: userID })
  }

  async delete({ cardID }) {
    const possibleCard = await CardModel.findOneAndDelete({ _id: cardID })
    return possibleCard
  }
  /*
  *  from -> from what card money will be transfered
  *  to -> to what card money will be transfered
  */
  async transferMoney({ id, from, to, amount }) {
    const cardFrom = await CardModel.findOne({ number: from })
    if (!cardFrom) {
      throw new Error('Card doesn`t exist')
    }
    const cardTo = await CardModel.findOne({ number: to })
    if (!cardTo) {
      throw new Error('Card doesn`t exist, check your typo')
    }
    if (cardFrom.moneyAmount < amount) {
      throw new Error('You don`t have enough money to transfer')
    }
    const user = await UserModel.findOne({ _id: id})
    await CardModel.updateOne({ _id: cardFrom._id }, { moneyAmount: cardFrom.moneyAmount - amount })
    await CardModel.updateOne({ _id: cardTo._id }, { moneyAmount: cardTo.moneyAmount + amount })
    await Mailer.sendReceipt(user.email, amount)
    return true
  }

  async madeOperation({ cardID, type, moneyAmount, monthes }) {
    const card = await CardModel.findOne({ _id: cardID })
    if (type === OPERATIONS.DEPOSIT && card.deposit !== undefined) {
      throw new Error('You already have a deposit on this card')
    }
    if (type === OPERATIONS.CREDIT && card.credit !== undefined) {
      throw new Error('You already have a credit on this card')
    }
    if (type === OPERATIONS.DEPOSIT) {
      if (moneyAmount > card.moneyAmount) {
        throw new Error('You don`t have enough money to open deposit')
      }
    }

    if (type !== OPERATIONS.DEPOSIT && type !== OPERATIONS.CREDIT) {
      throw new Error('Unknown operation')
    }
    const expiration_date = Date.now() + monthes * MONTH_IN_MS
    const month_payment = moneyAmount / monthes * 1.2
    const operation = await OperationModel.create({ type, amount: moneyAmount, month_payment, expiration_date })
    if (type === OPERATIONS.DEPOSIT) {
      const newCard = await CardModel.updateOne({ _id: card._id }, { deposit: operation._id, moneyAmount: card.moneyAmount - moneyAmount })
      return newCard
    }
    else {
      const newCard = await CardModel.updateOne({_id: card._id}, { credit: operation._id, moneyAmount: card.moneyAmount + moneyAmount })
      return newCard
    }
  }

  async updateAll() {
    for await (const card of CardModel.find()) {
      if (card.deposit) {
        const deposit = await OperationModel.findOne({ _id: card.deposit })
        CardModel.updateOne({ _id: card._id }, { moneyAmount: card.moneyAmount + deposit.month_payment })
        if (Date.now() > deposit.expiration_date) {
          OperationModel.deleteOne({ _id: deposit._id })
        }
      }
      if (card.credit) {
        const credit = await OperationModel.findOne({ _id: card.credit })
        CardModel.updateOne({ _id: card._id }, { moneyAmount: card.moneyAmount - credit.month_payment })
        if (Date.now() > credit.expiration_date) {
          OperationModel.deleteOne({ _id: credit._id })
        }
      }
    }
    if (card.expiration_date > Date.now()) {
      CardModel.updateOne({ _id: card._id }, { type: 'Expired' })
    }
  }
}

export default new CardService()