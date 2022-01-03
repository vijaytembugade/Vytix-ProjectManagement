import './Sidebar.css'
import DashBoardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

function Sidebar() {
    const { user } = useAuthContext()
    return (
        <div className='sidebar'>
            <div className="sidebar-content">
                <div className="user">
                    {/* avatar and username here */}
                    <p>{user ? `Hey, ${user.displayName}!` : `Hey, Guest User!`}</p>
                </div>

                <nav className="links">
                    <ul>
                        <li>
                            <NavLink to="/">
                                <img src={DashBoardIcon} alt="dahsboard"/>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="create new project"/>
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            
        </div>
    )
}

export default Sidebar
