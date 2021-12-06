import { checkPassword, generateAccessToken, hashPassword, generateConfirmationCode } from "../Util/Util.js"
import UserModel from "../database/user.js";
import Mailer from '../mail/mail.js'
import CardModel from '../database/card.js'

class UserService {
  async create({ fname, lname, email, password }) {
    const candidate = await this.findUser(email)
    if (candidate) {
      throw new Error("User with such email already exists")
    }
    const hashedPassword = await hashPassword(password)
    const confirmationCode = generateConfirmationCode()
    const user = await UserModel.create({ fname, lname, password: hashedPassword, email, confirmationCode })
    await Mailer.sendConfirmationCode(email, confirmationCode)
    return user
  }

  async checkMatch(user) {
    const { password } = user
    const dbUser = await this.findUser(user.email)
    if (!dbUser) {
      throw new Error("User not found")
    }
    const { password: hashedPass } = dbUser
    const validPassword = await checkPassword(password, hashedPass)
    if (!validPassword) {
      throw new Error("Email or Password is invalid")
    }
    return generateAccessToken(dbUser._id)
  }

  async findUserByCode(confirmationCode) {
    return UserModel.findOne({ confirmationCode })
  }

  async findUser(email) {
    return await UserModel.findOne({ email })
  }

  async findUserById(id){
    return await UserModel.findOne({ _id: id})
  }

  async verifyUser(code) {
    const user = await UserModel.findOneAndUpdate({ confirmationCode: code }, { status: 'Active' })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async getAllUserCards (userID) {
    const cards = await CardModel
      .find({user: userID})
      .populate('credit')
      .populate('deposit')
    return cards
  }
}

export default new UserService()