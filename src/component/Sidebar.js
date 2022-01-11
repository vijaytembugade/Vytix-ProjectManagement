import './Sidebar.css'
import DashBoardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Home from '../assets/home.svg'
import Info from '../assets/info.svg'
import Signin from '../assets/signin.svg'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import Avatar from './Avatar'

function Sidebar() {
    const { user } = useAuthContext()
    return (
        <>
            <div className='sidebar'>
                <div className="sidebar-content">
                    <div className="user">
                        { user && <Avatar src={ user.photoURL } /> }
                        <p>{ user ? `Hey, ${user.displayName}!` : `Hey, Guest User!` }</p>
                    </div>

                    <nav className="links">
                        <ul>
                            { !user && <li>
                                <NavLink to="/home">
                                    <img src={ Home } alt="dahsboard" />
                                    <span>Home</span>
                                </NavLink>
                            </li> }
                            { !user && <li>
                                <NavLink to="/about">
                                    <img src={ Info } alt="dahsboard" />
                                    <span>About </span>
                                </NavLink>
                            </li> }
                            { !user && <li>
                                <NavLink to="/signup">
                                    <img src={ Signin } alt="dahsboard" />
                                    <span>Sign Up </span>
                                </NavLink>
                            </li> }
                            { user && <>
                                <li>
                                    <NavLink exact to="/">
                                        <img src={ DashBoardIcon } alt="dahsboard" />
                                        <span>Dashboard</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/create">
                                        <img src={ AddIcon } alt="create new project" />
                                        <span>New Project</span>
                                    </NavLink>
                                </li>
                            </> }
                        </ul>
                    </nav>
                </div>

            </div>

            
        </>
    )
}

export default Sidebar
