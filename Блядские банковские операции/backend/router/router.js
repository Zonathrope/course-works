import express from "express"
import CardController from "../controllers/CardController.js"
import UserController from "../controllers/userController.js"

const router = express.Router()
router.post('/updateAll', CardController.updateAll)
router.post('/createCard', CardController.createCard)
router.post('/deleteCard', CardController.deleteCard)
router.post('/transferMoney', CardController.transferMoney)
router.post('/createOperation', CardController.createOperation)

router.post('/register', UserController.registration)
router.post('/login', UserController.login)
router.get("/confirm/:confirmationCode", UserController.verifyUser)
router.get("/getUserCards/:jwtToken", UserController.getAllUserCards)
router.get("/getUser/:jwtToken", UserController.getUserData)

export default router