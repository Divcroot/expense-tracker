import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'
import { prepareChartData } from '../../utils/helper'

const RecentIncomeWithChart = ({data, totalIncome}) => {

    const [chartData, setChartData] = useState([])

    const COLORS = ["#875CF5", "#FA2C37", "#FF6900", '#4f39f6']

    useEffect(()=>{
        const result = prepareChartData(data)
        setChartData(result)
    }, [data])

  return (
    <div className='card'>
       <div className='flex items-center justify-between'>
           <h5 className='text-lg'>Last 60 Days Income</h5>
       </div>

       <CustomPieChart data={chartData} label="Total Income" totalAmount={`$${totalIncome}`} colors={COLORS} showTextAnchor/>
    </div>
  )
}

export default RecentIncomeWithChart