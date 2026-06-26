import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'
import CustomBarChart from '../Charts/CustomBarChart'

const Last30DaysExpenes = ({data}) => {

    const [chartData, setChartData] = useState([])

    useEffect(()=>{
        const result = prepareExpenseBarChartData(data)
        setChartData(result)
    }, [data])

  return (
    <div className='card col-span-1'>
       <div className='flex items-center justify-between'>
           <h5>Last 30 Days Expenses</h5>
       </div>

       <CustomBarChart data={chartData} dataKey="category"/>
    </div>
  )
}

export default Last30DaysExpenes