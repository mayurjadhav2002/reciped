import React from 'react'

function RecentRecipe(props) {
    return (
        <div className='p-4 my-5 w-full bg-orange-50 dark:bg-dark'>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Recent Recipes Written By you
            </h4>
            {props.AllRecipes.length > 0 ?
                <div className='grid lg:grid-cols-5 md:grid-cols-1'>
                    <div className='p-2 bg-white'>

                    </div>
                </div> :
                <div className="text-lg font-semibold py-5">
                    Seem's Like you haven't wrote about any Dish, <span className='text-blue-500 underline underline-primary'>Click here to write</span>
                </div>
            }
        </div>
    )
}

export default RecentRecipe