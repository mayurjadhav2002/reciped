import { Label } from '@radix-ui/react-menubar'
import React from 'react'

function ListOfRecipe() {
    return (
        <div>
            <div className='p-10 w-4/5 mx-auto h-50 bg-gray-50'>
                <div className=' w-64 p-5 rounded-lg h-auto hover:bg-orange-50 hover:scale-100 transition-all duration-300 cursor-pointer'>
                    <img src={'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600'}
                        className='rounded-lg object-cover mb-2'
                    />
                    <Label className='text-lg font-semibold text-ellipsis'>Rasberry pi stracake</Label>
                    <div className='flex justify-between items-start mt-2'>
                        <div className='flex items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                            </svg>
                            <span className='text-sm'>
                                {"4.4 (13)"}
                            </span>
                        </div>
                        <span className='text-sm font-semibold text-orange-500'>
                            by Sarah johne
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ListOfRecipe