import { validationResult } from 'express-validator'
import CardService from '../services/cardService.js'
import jwt from "jsonwebtoken";

class CardController {
  async createCard(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Something went wrong", errors })
      }
      const { jwtToken } = req.body
      const { id } = jwt.verify(jwtToken, process.env.RANDOMSECRETKEY)
      const card = await CardService.create({ userID: id })
      return res.json({ message: 'Card created', card })
    } catch (e) {
      return res.status(400).json({
        errors: e
      })
    }
  }

  async deleteCard(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Something went wrong", errors })
      }
      const { cardID } = req.body
      const deletedCard = await CardService.delete({ cardID })
      return res.json({ message: "Card deleted", deletedCard })
    } catch (e) {
      return res.status(400).json({
        errors: e
      })
    }
  }

  async transferMoney(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Something went wrong", errors })
      }
      const { jwtToken, from, to, amount } = req.body
      const { id } = jwt.verify(jwtToken, process.env.RANDOMSECRETKEY)
      const transfer = await CardService.transferMoney({ id, from, to, amount })
      return res.json({ message: "Money transfered", transfer })
    } catch (e) {
      return res.status(400).json({
        errors: e
      })
    }
  }

  async createOperation(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Something went wrong", errors })
      }
      const { cardID, type, moneyAmount, monthes } = req.body
      const createdOperation = await CardService.madeOperation({cardID, type, moneyAmount, monthes})
      return res.json({message: "Operation created", createdOperation})
    } catch (e) {
      return res.status(400).json({
        errors: e
      })
    }
  }

  async updateAll(req, res) {
    return res.json(await CardService.updateAll())
  }
}

export default new CardController()