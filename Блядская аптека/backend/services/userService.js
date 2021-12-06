import { checkPassword, generateAccessToken, hashPassword } from "../Util/Util.js"
import UserModel from "../database/crud/userCrud.js"
import jwt from "jsonwebtoken"
import medicineCrud from "../database/crud/medicineCrud.js"

class UserService {
  async create({ fname, lname, email, password, phone: phoneNumber }) {
    const candidate = await UserModel.getOne(email)
    if (candidate.length) {
      throw new Error("User with such email already exists")
    }
    const hashedPassword = await hashPassword(password)
    await UserModel.create({ fname, lname, password: hashedPassword, email, phoneNumber })
    const users = await UserModel.getOne(email)
    return generateAccessToken(users[0].id)
  }

  async updateUser(id, user) {
    const candidate = await UserModel.findUserById(id)
    if (!candidate.length) {
      throw new Error("Something went wrong, try again later")
    }
    await UserModel.update(id, user)
    return true
  }

  async checkMatch(user) {
    const { password } = user
    const dbUser = await this.findUser(user.email)
    if (!dbUser.length) {
      throw new Error("User not found")
    }
    const { password: hashedPass } = dbUser[0]
    const validPassword = await checkPassword(password, hashedPass)
    if (!validPassword) {
      throw new Error("Email or Password is invalid")
    }
    return generateAccessToken(dbUser[0].id)
  }

  async findUser(email) {
    const data = await UserModel.getOne(email)
    return data;
  }

  async getUserCart(id) {
    const cart = await UserModel.getUserCart(id)
    return cart
  }

  async addToCart({ userID, itemID, amount }) {
    const candidate = await UserModel.findUserById(userID)
    if (!candidate.length) {
      throw new Error("Something went wrong, try again later")
    }
    try {
      await UserModel.addToCart(userID, itemID, amount)
      await medicineCrud.updateAmount(itemID, amount)
      return true
    } catch (e) {
      return { e }
    }
  }

  async deleteFromCart({ id }) {
    try {
      await UserModel.deleteFromCart(id)
      return true
    } catch (e) {
      return { e }
    }
  }

  async changeItemAmount({ id, amount }) {
    try {
      await UserModel.updateCartAmount(id, amount)
      return true
    } catch (e) {
      return e
    }
  }

  async clearCart({ userID }) {
    try {
      return await UserModel.clearCart(userID)
    } catch (e) {
      return e
    }
  }

  async findUserById(jwtToken) {
    const { id } = jwt.verify(jwtToken, process.env.RANDOMSECRETKEY)
    const user = await UserModel.findUserById(id)
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }
}

export default new UserService()