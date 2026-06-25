import xlsx from 'xlsx'
import { Expense } from '../models/Expense.js'


//Add Expense API
export const addExpense = async (req, res) => {
    try {
        const userId = req.user.id
        const { icon, category, amount, date } = req.body

        //Validation Checks
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        })

        await newExpense.save()

        res.status(201).json(newExpense)
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

//Get all Incomes API
export const getAllExpense = async (req, res) => {
    try {
        const userId = req.user.id
        const expenses = await Expense.find({ userId }).sort({ date: -1 })
        res.json(expenses)
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

//Download Income as excel
export const downloadExpenseExcel = async (req, res) => {
    try {
        const userId = req.user.id
        const expenses = await Expense.find({ userId }).sort({ date: -1 })

        //Prepare data for excel
        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Expense")
        xlsx.writeFile(wb, "expense_details.xlsx")
        res.download('expense_details.xlsx')
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

//Delete an income
export const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.json({ message: "Expense deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}