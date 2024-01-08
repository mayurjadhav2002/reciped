import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Landing/Sidebar';
import { IoStatsChartOutline } from 'react-icons/io5';
import { getAsingleRecipe } from '../Utils/query';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarImage } from '../components/ui/avatar';
import { FaCalendarAlt } from "react-icons/fa";
import { Parser } from '@alkhipce/editorjs-react';
import "./ViewStyle.css"
function ViewRecipe() {
    const [recipe, setRecipe] = useState();
    const [loading, setLoading] = useState(true);
    let { id } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                if (loading) {
                    const res = await getAsingleRecipe(id);
                    setRecipe(res.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return "loading";
    }

    return (
        <div className="flex h-screen scrollbar-hidden scrollbar-hidden">
            {/* Main Content */}
            <div className="flex-1 p-10 overflow-y-scroll scrollbar-hidden">
                {/* Title */}
                <h1 className=" text-4xl font-bold font-sans tracking-tight leading-5 lg:text-5xl .scrollbar-hidden">
                    {recipe.title}
                </h1>
                <div className='flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pt-5 pb-2 dark:border-white dark:border-opacity-10'>
                    <div className='flex flex-wrap items-center'>
                        <div className='mb-5 mr-10 flex items-center'>
                            <div className='mr-4'>
                                <div className='relative h-10 w-10 overflow-hidden rounded-full'>
                                    <Avatar>
                                        <AvatarImage src={recipe.created_by.avatar} />
                                    </Avatar>
                                </div>
                            </div>
                            <div className='w-full'>
                                <h4 className='mb-1 text-base font-medium text-body-color dark:text-gray-200'>
                                    <span>By {recipe.created_by.name}</span>
                                </h4>
                            </div>
                        </div>
                        <div className='mb-5 flex items-center'>
                            <p className='mr-5 flex items-center text-base font-medium text-body-color dark:text-gray-200'>
                                <span className='mr-3'>
                                    <FaCalendarAlt className='w-4 h-4' />
                                </span>
                                July 15, 2023
                            </p>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <div className='flex items-center gap-1'>
                            <IoStatsChartOutline className='w-4 h-4 text-gray-500' />
                            <span className='text-sm text-gray-500'>
                                {recipe.views} views
                            </span>
                        </div>
                    </div>
                </div>
                <section className='recipe'>
                    <Parser data={recipe.recipe} />
                </section>
            </div>

            {/* Sidebar */}
            <Sidebar />
        </div>
    );
}

export default ViewRecipe;
