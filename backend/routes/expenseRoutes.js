import express from 'express'
import { addExpense, getAllExpense, downloadExpenseExcel, deleteExpense } from '../controllers/expenseController.js'
import { protect } from '../middlewares/authMiddleware.js'

const expenseRouter = express.Router()

expenseRouter.post('/add', protect, addExpense)
expenseRouter.get('/get', protect, getAllExpense)
expenseRouter.get('/downloadexcel', protect, downloadExpenseExcel)
expenseRouter.delete('/:id', protect, deleteExpense)

export default expenseRouter