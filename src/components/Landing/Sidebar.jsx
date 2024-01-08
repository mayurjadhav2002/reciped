import React, { useEffect, useState } from 'react';
import { getRecommnededRecipes } from '../../Utils/query';
import { IoStatsChartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [recommneded, setRecommended] = useState()
    const [fetched, setFetched] = useState(false)
    useEffect(() => {
        if (!fetched) {
            getRecommnededRecipes().then(res => setRecommended(res.data)).then(setFetched(true)).catch(e => { throw new Error(e) })
        }
    }, [])
    console.log(recommneded)
    return (
        <div className=" h-screen w-1/3 bg-orange-50 bg-opacity-15 border-l-2 border-primary flex flex-col scrollbar-hidden">
            {/* Sidebar Header */}
            <div className="flex items-center justify-center h-16 border-b border-orange-700">
                <span className="text-xl font-bold text-primary">Recommended Recipes for you</span>
            </div>
            <div className='px-3 grid grid-cols-2 mx-auto py-4 gap-2'>

                {recommneded && recommneded.map((recipe, index) => (
                    <Link to={'/view/' + recipe._id} className='flex flex-col gap-2 bg-orange-100 rounded-lg mb-2 hover:scale-105 duration-500' key={index}>
                        <img
                            src={recipe.thumbnail}
                            className='h-40 object-center object-cover rounded-t-lg'
                            alt={recipe.title}
                        />
                        <div className='px-2 flex flex-col gap-2 pb-3 '>
                            <div className="text-md font-semibold">{recipe.title}</div>
                            <div className='flex justify-between items-center '>
                                <div className='flex items-center gap-1'>
                                    <IoStatsChartOutline className='w-4 h-4 text-gray-500' />
                                    <span className='text-sm text-gray-500'>
                                        {recipe.views} views
                                    </span>
                                </div>

                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Sidebar Navigation Links */}


            {/* Sidebar Footer */}

        </div>
    );
};

export default Sidebar;
