import React from 'react';
import { IoStatsChartOutline } from 'react-icons/io5';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { DeleteRecipe } from '../../Utils/query';
import { Link } from 'react-router-dom';

function RecentRecipe(props) {
    const handleDelete = (id) => {
        try {
            DeleteRecipe(id)
                .then((res) => {
                    toast.success("Recipe deleted");
                    window.location.reload();
                })
                .catch((e) => {
                    console.log(e);
                    toast.warn("Failed to delete the recipe");
                });
        } catch (error) {
            toast.error("Some unexpected error occurred while deleting the Recipe");
        }
    }
    return (
        <div className='p-4 my-5 w-full dark:bg-dark'>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pb-5 text-primary">
                Recent Recipes Written By you
            </h4>
            <div className='grid lg:grid-cols-4 md:grid-cols-1  gap-8' >
                {props.AllRecipes.length > 0 ? (
                    props.AllRecipes.map((recipe, index) => (
                        <div to={`/dashboard/write/${recipe._id}`} className='flex flex-col gap-2 bg-orange-50 rounded-lg' key={index}>
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
                                    <div className='p-2 bg-red-200 rounded-lg cursor-pointer'>
                                        <RiDeleteBin5Line className='text-red-500' 
                                        onClick={(e)=>handleDelete(recipe._id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-lg font-semibold py-5">
                        Seems like you haven't written about any dish.{' '}
                        <span className='text-blue-500 underline underline-primary'>
                            Click here to write
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecentRecipe;
