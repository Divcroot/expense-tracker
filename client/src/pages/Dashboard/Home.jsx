import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard } from 'react-icons/io'
import { addThousandsSeparator } from '../../utils/helper'
import InfoCard from '../../components/Cards/InfoCard'
import RecentTransactions from '../../components/Dashboard/RecentTransactions'
import FinanceOverview from '../../components/Dashboard/FinanceOverview'
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions'
import Last30DaysExpenes from '../../components/Dashboard/Last30DaysExpenes'
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart'
import RecentIncome from '../../components/Dashboard/RecentIncome'
import Modal from '../../components/Modal'
import DeleteAlert from '../../components/DeleteAlert'
import toast from 'react-hot-toast'

const Home = () => {

  useUserAuth()

  const navigate = useNavigate()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
    type: ""
  })

  const fetchDashboardData = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)

      if (response.data) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error)
    }
    finally {
      setLoading(false)
    }
  }

  //Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({ show: false, data: null, type: "" })
      toast.success("Expense details deleted successfully")
      fetchDashboardData()
    } catch (error) {
      console.error("Error in deleting expense details: ", error.response?.data?.message || error?.message)
    }
  }

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({ show: false, data: null, type: "" })
      toast.success("Income details deleted successfully")
      fetchDashboardData()
    } catch (error) {
      console.error("Error in deleting income details: ", error.response?.data?.message || error?.message)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard icon={<IoMdCard />} label="Total Balance" value={addThousandsSeparator(dashboardData?.totalBalance || 0)} color="bg-primary" />

          <InfoCard icon={<LuWalletMinimal />} label="Total Income" value={addThousandsSeparator(dashboardData?.totalIncome || 0)} color="bg-orange-500" />

          <InfoCard icon={<LuHandCoins />} label="Total Expense" value={addThousandsSeparator(dashboardData?.totalExpenses || 0)} color="bg-red-500" />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions transactions={dashboardData?.recentTransactions} onSeeMore={() => navigate('/expense')} onDelete={(transaction) => {
            setOpenDeleteAlert({
              show: true,
              data: transaction._id,
              type: transaction.type,
            });
          }} />

          <FinanceOverview totalBalance={dashboardData?.totalBalance || 0} totalIncome={dashboardData?.totalIncome || 0} totalExpense={dashboardData?.totalExpenses || 0} />

          <ExpenseTransactions transactions={dashboardData?.last30DaysExpenses?.transactions || []} onSeeMore={() => navigate('/expense')} onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id, type: "expense" })
          }} />

          <Last30DaysExpenes data={dashboardData?.last30DaysExpenses?.transactions || []} />

          <RecentIncomeWithChart data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []} totalIncome={dashboardData?.totalIncome || 0} />

          <RecentIncome transactions={dashboardData?.last60DaysIncome?.transactions || []} onSeeMore={() => navigate('/income')} onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id, type: "income" })
          }} />
        </div>

        {openDeleteAlert?.show && (
          <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null })} title={openDeleteAlert.type === "expense" ? "Delete Expense" : "Delete Income"}>
            <DeleteAlert content={openDeleteAlert.type === "expense" ? "Are you sure you want to delete this expense detail?" : "Are you sure you want to delete this income detail?"} onDelete={openDeleteAlert.type === "expense" ? () => deleteExpense(openDeleteAlert.data) : () => deleteIncome(openDeleteAlert.data)} />
          </Modal>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Home