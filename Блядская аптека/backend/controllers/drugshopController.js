import DrugshopService from '../services/drugshopService.js'

class DrugshopConntroller{
  async getDrugshopsByName(req, res){
    try{
      const name = req.params.name
      const answer = await DrugshopService.getDrugshopsByName(name)
      return res.json(answer)
    } catch (e) {
      return res.status(400).send(`${e}`)
    }
  }

  async getDrugshopDyName(req, res) {
    try {
      const id = req.params.id
      const answer = await DrugshopService.getDrugshopByID(id)
      return res.json(answer)
    } catch (e) {
      return res.status(400).json({ e })
    }
  }


  async getAllMedicines(req, res){
    try{
      const id = req.params.id
      const answer = await DrugshopService.getAllMedicines(id)
      return res.json(answer)
    } catch (e) {
      return res.status(400).send(`${e}`)
    }
  }
}

export default new DrugshopConntroller()