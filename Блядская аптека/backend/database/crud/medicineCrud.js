import db from '../connection.js'

const TABLE_MEDICINE = 'medicine'
const TABLE_DRUGSHOP = 'drugshop'

class MedicineCrud {

  async getAllMedicinesByName(name){
    const query = db
    .table(TABLE_MEDICINE)
    .select(`${TABLE_MEDICINE}.name as medicine_name`)
    .select(`${TABLE_MEDICINE}.id as medicine_id`)
    .select('*')
    .leftJoin(TABLE_DRUGSHOP, `${TABLE_MEDICINE}.drugshop_id`, `${TABLE_DRUGSHOP}.id`)
    if(name && name !== 'all'){
      query.where(`${TABLE_MEDICINE}.name`, 'like', `%${name}%`)
    }
    return await query
  }

  async updateAmount(id, amount){
    const query = await db.raw(`update ${TABLE_MEDICINE} set amount = amount - ${amount} where id = ${id}`)
    return query
  }

}

export default new MedicineCrud()