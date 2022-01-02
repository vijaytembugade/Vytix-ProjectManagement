import './Navbar.css'
import Temple from '../assets/temple.svg'
import { Link, useHistory } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'


function Navbar() {
    const history = useHistory();
    const { logout, error, isPending } = useLogout()
     return (
        <div className='navbar'>
            <ul>
                <li className="logo" onClick={()=>history.push('/')}>
                    <img src={ Temple } alt="logo" />
                    <span>Vytix</span>
                </li>
                <li>
                    <Link to="/login"> Login</Link>
                </li>
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
                <li>
                    {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                    {isPending && <button className="btn" disabled={true}>Loging Out ...</button>}
                </li>
            </ul>
        </div>
    )
}

export default Navbar
