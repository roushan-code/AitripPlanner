import React from 'react'
export const SelectTravelesList = [

    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people: '1'
    },

    {
        id: 2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people: '5 to 10 People'
    },
]

const GroupSizeUi = ({ onSelectedOption }: any) => {
    return (
        <div className='flex gap-2 w-full overflow-x-scroll'>
            {SelectTravelesList.map((item) => (
                <div key={item.id} className='flex flex-col gap-2 border bg-white mt-4 p-4 rounded-lg hover:border-primary cursor-pointer transition-all duration-300 ease-in-out' onClick={() => { onSelectedOption(item.title + ":" + item.people) }}>
                    <div className='flex items-center gap-2' >
                        <div className='text-2xl'>{item.icon}</div>
                        <h3 className='font-bold w-max text-1xl mt-2'>{item.title}</h3>
                    </div>
                    <p className='text-sm text-gray-500'>{item.desc}</p>
                    <p className='text-sm text-gray-400 mt-1'>{item.people}</p>
                </div>
            ))}
        </div>
    )
}

export default GroupSizeUi



