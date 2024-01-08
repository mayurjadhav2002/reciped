import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext'
import RecentRecipe from '../../components/Dashboard/RecentRecipe'
import { getAllRecipesOfUser } from '../../Utils/query'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'

function Main() {
    const { user } = useUserContext()
    const [AllRecipes, setAllRecipes] = useState([])
    useEffect(() => {
        if (user?._id) {
            getAllRecipesOfUser(user._id).then((res) => setAllRecipes(res.data)).catch(e => console.log(e))
        }
    }, [user?._id])
    return (
        <div className='container py-5'>
            <div className='flex lg:flex-row justify-between'>

                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl dark:text-white">
                    Hey, Hii <span className='text-primary'>{user?.name}</span>
                </h1>

                <Link to={'write/new'}><Button>Create a Write Recipe</Button></Link>
            </div>


            <RecentRecipe AllRecipes={AllRecipes} />
        </div>
    )
}

export default Main