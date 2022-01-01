import './Navbar.css'
import Temple from '../assets/temple.svg'
import { Link, useHistory } from 'react-router-dom'


function Navbar() {
    const history = useHistory();
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
                    <button className="btn">Logout</button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
