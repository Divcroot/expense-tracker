import { Income } from "../models/Income.js"
import xlsx from 'xlsx'


//Add Income API
export const addIncome = async (req, res) => {
    try {
        const userId = req.user.id
        const { icon, source, amount, date } = req.body

        //Validation Checks
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })

        await newIncome.save()

        res.status(201).json(newIncome)
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

//Get all Incomes API
export const getAllIncome = async (req, res) => {
    try {
        const userId = req.user.id
        const incomes = await Income.find({ userId }).sort({ date: -1 })
        res.json(incomes)
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

//Download Income as excel
export const downloadIncomeExcel = async (req, res) => {
    try {
        const userId = req.user.id
        const incomes = await Income.find({ userId }).sort({ date: -1 })

        //Prepare data for excel
        const data = incomes.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Income")
        xlsx.writeFile(wb, "income_details.xlsx")
        res.download('income_details.xlsx')
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

//Delete an income
export const deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id)
        res.json({ message: "Income deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}