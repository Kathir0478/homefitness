import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <nav className='flex items-center h-10 w-full justify-end gap-10 px-5 z-10'>
                <Link to='/signup'>Sign up</Link>
                <Link to='/login'>Log In</Link>
                <Link to='/content'>Start Workouts</Link>
            </nav>
        </div>
    )
}

export default Home