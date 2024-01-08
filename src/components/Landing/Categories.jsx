import React from 'react';
import { Label } from '../ui/label';
import { FoodSelect } from '../../data/FoodData';

function Categories() {
    return (
        <div className='w-full'>

            <div className='whitespace-nowrap   gap-10 overflow-x-scroll px-4 p-2 scrollbar-hidden'>
                {FoodSelect.map((foodtype, index) => (
                    <div className='bg-orange-100 rounded-lg w-40 h-32 p-3 relative inline-block m-4  items-center hover:bg-orange-200 hover:scale-105 
                    transition-all duration-400 cursor-pointer
                    overflow-hidden' key={index}>
                        <Label className="text-md font-semibold">{foodtype.type}</Label>
                        <img src={foodtype.image} className='w-20 h-20  mx-auto  mt-2 hover:scale-110  transition-all duration-500 cursor-pointer' loading='lazy' alt={foodtype.type +' image'} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;
