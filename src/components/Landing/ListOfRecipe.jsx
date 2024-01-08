import { Label } from '@radix-ui/react-menubar';
import React, { useEffect, useState } from 'react';
import { SearchQuery, getAllRecipe } from '../../Utils/query';
import { IoStatsChartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Skeleton from './Skeleton';

function ListOfRecipe() {
    const [AllRecipes, setAllRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [initialRecipes, setInitialRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllRecipe().then((res) => {
            setAllRecipes(res.data);
            setInitialRecipes(res.data);
        });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);

        SearchQuery(search).then(res => setAllRecipes(res.recipes)).then(setLoading(false)).catch((e) => { console.log(e); setLoading(false) })

    };

    return (
        <div className='p-10 w-4/5 mx-auto h-50 bg-gray-50'>
            <form onSubmit={handleSearch}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Mockups, Logos..."
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                    >
                        Search
                    </button>
                </div>
            </form>
            <div className='grid lg:grid-cols-4 grid-cols-1 mt-5'>
                {AllRecipes.length === 0 && "No Dish Found."}
                {!loading ? (
                    AllRecipes.map((recipe, index) => (
                        <Link
                            to={`/recipe/${recipe._id}`}
                            key={index}
                            className='w-64 p-5 rounded-lg h-auto hover:bg-orange-50 hover:scale-100 transition-all duration-300 cursor-pointer'
                        >
                            <img
                                src={recipe.thumbnail}
                                loading='lazy'
                                alt={recipe.title}
                                className='rounded-lg object-cover bg-primary mb-2 h-40 w-full object-center'
                            />
                            <Label className='text-lg font-semibold text-ellipsis'>{recipe.title}</Label>

                            <div className='flex justify-between items-start mt-2 mb-0'>
                                <div className='flex items-center gap-1'>
                                    <IoStatsChartOutline className='w-4 h-4 text-gray-500' />
                                    <span className='text-sm text-gray-500'>
                                        {recipe.views} views
                                    </span>
                                </div>
                                <span className='text-sm font-semibold text-orange-500'>
                                    by {recipe.created_by.name}
                                </span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                )}
            </div>
        </div>
    );
}

export default ListOfRecipe;
