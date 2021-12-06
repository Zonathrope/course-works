import express from 'express'
import userController from '../controllers/userController.js'
import drugshopController from '../controllers/drugshopController.js'
import medicineController from '../controllers/medicineController.js'

const router = express.Router()
// user routes
router.post('/login', userController.login)
router.post('/register', userController.registration)
router.post('/addToCart', userController.addToCart)
router.post('/deleteFromCart', userController.deleteFromCart)
router.put('/updateCartAmount', userController.updateCartAmount)
router.post('/clearCart', userController.clearCart)
router.get('/getUser/:jwt', userController.getUser)
router.get('/getUserCart/:jwt', userController.getUserCart)
router.post('/updateUser', userController.updateUser)


// drugshop routes
router.get('/getDrugshopsByName/:name', drugshopController.getDrugshopsByName)
router.get('/getAllMedicines/:id', drugshopController.getAllMedicines)
router.get('/getDrugshopDyName/:id', drugshopController.getDrugshopDyName)

//medicine routes
router.get('/getAllMedicinesByName/:name', medicineController.getAllMedicinesByName)

export default router