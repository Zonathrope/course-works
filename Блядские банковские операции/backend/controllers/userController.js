import UserService from "../services/userService.js";
import { generateAccessToken } from "../Util/Util.js"
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'

class UserController {
  //creating new user and returning it
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Something went wrong", errors })
      }
      const { firstName, lastName, password, email } = req.body
      const candidate = await UserService.create({ fname: firstName, lname: lastName, password, email })
      return res.json({ message: "User was created", token: await generateAccessToken(candidate._id)})
    } catch (e) {
      //TODO: fix returning json
      return res.status(400).json({
        errors: ["Registration error. User with such email already exists", e]
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
      return res.status(400).json({error: `${e.message}`})
    }
  }

  async verifyUser(req, res) {
    try {
      const user = await UserService.verifyUser(req.params.confirmationCode)
      return res.json(user)
    } catch (e) {
      return res.status(400).send({ errors: e })
    }
  }

  async getUserData(req, res) {
    try {
      const token = req.params.jwtToken
      const { id } = jwt.verify(token, process.env.RANDOMSECRETKEY)
      const user = await UserService.findUserById(id)
      return res.json(user)
    } catch (e){
      return res.status(400).json({ message: 'wrong jwt token', e})
    }
  }

  async getAllUserCards(req, res) {
    try {
      const token = req.params.jwtToken
      const { id } = jwt.verify(token, process.env.RANDOMSECRETKEY)
      const cards = await UserService.getAllUserCards(id)
      return res.json(cards)
    } catch (e) {
      return res.status(400).json({ errors: e })
    }
  }
}


export default new UserController()