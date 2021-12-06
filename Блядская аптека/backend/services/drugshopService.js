import drugshopCrud from "../database/crud/drugshopCrud.js";

class DrugShopService{
  async getDrugshopsByName(name){
    const drugshops = await drugshopCrud.getDrugshopsByName(name)
    return drugshops
  }

  async getAllMedicines(id){
    const medicines = await drugshopCrud.getAllMedicines(id)
    return medicines
  }

  async getDrugshopByID(id){
    const drugshop = await drugshopCrud.getDrugshopByID(id)
    return drugshop[0]
  }
}

export default new DrugShopService()