import './Navbar.css'
import Temple from '../assets/temple.svg'

import { Link, useHistory } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';


function Navbar() {
    const history = useHistory();
    const { user } = useAuthContext()
    const { logout, isPending } = useLogout()
    return (
        <div className='navbar'>
            <ul>
                <li className="logo" onClick={ () => history.push('/home') }>
                    <img src={ Temple } alt="logo" />
                    <span>Vytix</span>
                </li>
                { !user && <>
                    <li>
                        <Link to="/login"> Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </> }
                { user &&
                    <>
                        <li>
                            <Link to="/home"> Home</Link>
                        </li>
                        <li>
                            <Link to="/about"> About</Link>
                        </li>
                        <li>
                            { !isPending && <button className="btn" onClick={ logout }>Logout</button> }
                            { isPending && <button className="btn" disabled={ true }>Loging Out ...</button> }
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}

export default Navbar
