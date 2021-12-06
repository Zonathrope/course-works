import UserService from "../services/userService.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"

class UserController {
  //creating new user and returning it
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Something went wrong", errors })
      }
      const { fname, lname, phone, password, email } = req.body
      const candidate = await UserService.create({ fname, lname, phone, password, email })
      return res.json({ message: "User was created", candidate })
    } catch (e) {
      //TODO: fix returning json
      return res.status(400).json({
        errors: ["Registration error. User with such email already exists"]
      })
    }
  }

  //check if 2 password is match and return access token which expires in 24h if it`s true
  async login(req, res) {
    try {
      const user = { email: req.body.email, password: req.body.password }
      //return generated token
      return res.json(await UserService.checkMatch(user))
    } catch (e) {
      return res.status(400).json(`${e.message}`)
    }
  }

  async getUserCart(req, res) {
    try {
      const jwtToken = req.params.jwt
      const { id } = jwt.verify(jwtToken, process.env.RANDOMSECRETKEY)
      const answer = await UserService.getUserCart(id)
      return res.json(answer)
    } catch(e){
      return res.status(400).json(e)
    }
  }

  async addToCart(req, res) {
    try {
      const { jwtToken, itemID, amount } = req.body
      const { id } = jwt.verify(jwtToken, process.env.RANDOMSECRETKEY)
      const answer = await UserService.addToCart({ userID: id, itemID, amount })
      return res.json({ answer })
    } catch (e) {
      return res.status(400).send(`${e.message}`)
    }
  }

  async deleteFromCart(req, res) {
    try {
      const { id } = req.body
      const answer = await UserService.deleteFromCart({ id })
      return res.json({ answer })
    } catch (e) {
      return res.status(400).send(`${e}`)
    }
  }

  async updateCartAmount(req, res) {
    try {
      const { id, amount } = req.body
      const answer = await UserService.changeItemAmount({ id, amount })
      return res.json(answer)
    } catch (e) {
      return res.status(400).send(`${e}`)
    }
  }

  async clearCart(req, res) {
    try {
      const { jwt: jwtToken } = req.body
      const { id } = jwt.verify(jwtToken, process.env.RANDOMSECRETKEY)
      const answer = await UserService.clearCart({ userID: id })
      return res.json(answer)
    } catch (e) {
      return res.status(400).send(`${e}`)
    }
  }

  async getUser(req, res) {
    try {
      const jwt = req.params.jwt
      const user = await UserService.findUserById(jwt)
      return res.json(user)
    } catch (e) {
      return res.status(400).json({ e: `${e}`, status: 400 })
    }
  }

  async updateUser(req, res) {
    try {
      const user = req.body
      const {fname, lname, email, phoneNumber} = user
      const answer = await UserService.updateUser(user.id, {fname, lname, email, phoneNumber})
      return res.json(answer)
    } catch (e) {
      return res.status(400).json(e)
    }
  }
}


export default new UserController()