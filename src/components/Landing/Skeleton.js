import React from 'react'

function Skeleton() {
    return (
        <div>
            <div className='w-64 p-5 rounded-lg h-auto bg-orange-100 mb-5
            '>
                <div
                    className='rounded-lg object-cover  animate-pulse bg-orange-200 mb-2 h-40 w-full object-center'
                ></div>
                <div className=' bg-orange-200 w-full h-6 my-2 rounded-md  animate-pulse'></div>
                <div className=' bg-orange-200 w-full h-6  rounded-md  animate-pulse'></div>

                <div className='flex justify-between items-start mt-7 mb-0'>
                    <div className='flex items-center gap-1 '>
                        <div className='w-4 h-4 bg-orange-300  animate-pulse' ></div>
                        <span className='w-12 h-4 bg-orange-300 rounded  animate-pulse'>

                        </span>
                    </div>
                    <span className='w-24 h-4 bg-orange-300  animate-pulse'>

                    </span>
                </div>
            </div>
        </div>
    )
}

export default Skeleton