import React from 'react'

export const SelectBudgetOptions = [

    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
        color: 'bg-green-100 text-green-600'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
        color: 'bg-wheat text-yellow-600'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don’t worry about cost',
        icon: '💸',
        color: 'bg-purple-100 text-purple-600'
    },
]


const BudgetUi = ({ onSelectedOption }: any) => {
  return (
    <div className='flex gap-2 w-full overflow-x-scroll'>
        {SelectBudgetOptions.map((item) => (
            <div key={item.id} className={`flex flex-col gap-2 border bg-white mt-4 p-4 rounded-lg hover:border-primary cursor-pointer transition-all duration-300 ease-in-out ${item.color}`}>
                <div className='flex items-center gap-2' onClick={() => { onSelectedOption(item.title + ":" + item.desc) }} >
                    <div className='text-2xl'>{item.icon}</div>
                    <h3 className='font-bold w-max text-1xl mt-2'>{item.title}</h3>
                </div>
                <p className='text-sm text-gray-500'>{item.desc}</p>
            </div>
        ))}
    </div>  
  )
}

export default BudgetUi