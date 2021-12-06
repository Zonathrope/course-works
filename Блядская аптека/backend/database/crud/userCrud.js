import db from '../connection.js'

const TABLE_USERS = 'users'
const TABLE_CART = 'users__medicine'
const TABLE_MEDICINE = 'medicine'

class UserCrud {

  async create(user) {
    return await db
      .table(TABLE_USERS)
      .insert({
        ...user
      })
  }

  async update(id, user) {
    await db
      .table(TABLE_USERS)
      .where('id', '=', id)
      .update({
        ...user
      })
  }

  async getUserCart(id) {
    const query = db
    .table(TABLE_CART)
    .select('*')
    .where('user_id', '=', id)
    .leftJoin(TABLE_MEDICINE, `${TABLE_MEDICINE}.id`, `${TABLE_CART}.medicine_id`)
    .select(`${TABLE_CART}.amount as user_amount`)
    .select(`${TABLE_CART}.id as order_id`)
    return query
  }

  async getOne(email) {
    return db
      .table(TABLE_USERS)
      .where('email', '=', email)
  }

  async findUserById(id) {
    return db
      .table(TABLE_USERS)
      .where('id', '=', id)
  }

  async deleteOne(id) {
    await db
      .table(TABLE_USERS)
      .where('id', '=', id)
      .del()
  }

  async addToCart(userID, medicineID, amount) {
    await db
    .table(TABLE_CART)
    .insert({
      user_id: +userID,
      medicine_id: +medicineID,
      amount: +amount
    })
  }

  async deleteFromCart(id) {
    await db
      .table(TABLE_CART)
      .where('id', '=', id)
      .del()
  }

  async updateCartAmount(id, amount) {
    await db
      .table(TABLE_CART)
      .where('id', '=', id)
      .update({ amount })
  }

  async clearCart(userID) {
   return await db
      .table(TABLE_CART)
      .where('user_id', '=', userID)
      .del()
  }
}

export default new UserCrud()