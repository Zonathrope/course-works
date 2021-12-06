import db from '../connection.js'

const TABLE_MEDICINE = 'medicine'
const TABLE_DRUGSHOP = 'drugshop'

class DrugshopCrud{

  async getAllMedicines(id){
    const query = db
    .table(TABLE_MEDICINE)
    .select('*')
    .select('name as medicine_name')
    .where('drugshop_id', '=', id)
    return query
  }

  async getDrugshopsByName(name){
    const query = db
    .table(TABLE_DRUGSHOP)
    .select('*')
    if(name && name !== 'all'){
      query
        .where('name', 'like', `%${name}%`)
    }
    return query
  }

  async getDrugshopByID(id){
    const query = db
      .table(TABLE_DRUGSHOP)
      .select('*')
      .where('id', '=', id)
    return query
  }

}

export default new DrugshopCrud()