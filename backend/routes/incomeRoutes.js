import express from 'express'
import { addIncome, deleteIncome, downloadIncomeExcel, getAllIncome } from '../controllers/incomeController.js'
import { protect } from '../middlewares/authMiddleware.js'

const incomeRouter = express.Router()

incomeRouter.post('/add', protect, addIncome)
incomeRouter.get('/get', protect, getAllIncome)
incomeRouter.get('/downloadexcel', protect, downloadIncomeExcel)
incomeRouter.delete('/:id', protect, deleteIncome)


export default incomeRouter