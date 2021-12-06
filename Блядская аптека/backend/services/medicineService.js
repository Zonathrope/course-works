import medicineCrud from "../database/crud/medicineCrud.js"

class MedicineService{
  async getAllMedicinesByName(name) {
    const medicines = await medicineCrud.getAllMedicinesByName(name)
    return medicines
  }

}

export default new MedicineService()