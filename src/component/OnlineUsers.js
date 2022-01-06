import { useEffect, useState } from "react"
import { useCollection } from "../hooks/useCollection"
import Avatar from "./Avatar"
import "./OnlineUser.css"

const OnlineUsers = () => {

    const {error, documents} = useCollection('users')


    return (
        <div className="user-list">
            
            <div className="show-all-users">All Users</div>
            {error && <div className="error">{error}</div>}
            {documents && documents.map(user=>(
                <div key={user.id} className="user-list-item">
                    {user.online && <span className="online-user"></span>}
                    <span>{user.displayName.substring(0,15)}</span>
                    <Avatar src={user.photoURL}/>
                </div>
            ))}
        </div>
    )
}

export default OnlineUsers
