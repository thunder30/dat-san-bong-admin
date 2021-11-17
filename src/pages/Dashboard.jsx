import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
    return (
        <div>
            Dashboard
            <Link to="user">User</Link>
            <Link to="/user/create">Create</Link>
        </div>
    )
}

export default Dashboard
