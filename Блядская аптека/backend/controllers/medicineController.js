import MedicineService from '../services/medicineService.js'

class MedicineController {
  async getAllMedicinesByName(req, res) {
    try {
      const name = req.params.name
      const answer = await MedicineService.getAllMedicinesByName(name)
      return res.json(answer)
    } catch (e) {
      return res.status(400).send(`${e}`)
    }
  }
}

export default new MedicineController()
