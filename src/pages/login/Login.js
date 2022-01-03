import { useState } from 'react'
import { useGoogleAuth } from '../../hooks/useGoogleAuth'
import './Login.css'
import { useLogin } from '../../hooks/useLogin'
import { Link } from 'react-router-dom'

const Login = () => {
    const { login, isPending, error } = useLogin()
    const { signup: signupGoogle, error: errorGoogle, isPending: osPendingGoogle } = useGoogleAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e){
        e.preventDefault()
        login(email, password)
    }

    
    return (
        <div>
            <div className='google-button-container'>
            { errorGoogle && <div className='error'>{ errorGoogle }</div> }
                <div class="google-button" onClick={ ()=>signupGoogle() }>
                    <img alt="Google login" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                    {!osPendingGoogle ? <p>Log in with Google</p> : <p>Logging in...</p>}
                </div>
            </div>
            <hr />


            <form className='auth-form' onSubmit={ handleSubmit }>

                <h2>Log in</h2>
                
                <label>
                    <span>Email</span>
                    <input type="email" required onChange={ (e) => setEmail(e.target.value) } value={ email } />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" required onChange={ (e) => setPassword(e.target.value) } value={ password } />
                </label>
                { error && <div className='error'>{ error }</div> }


                { isPending ? <div className='spinner-container'>
                    <div className="spinner"></div>
                </div> :
                    <button className="btn btn-large">Log in</button>
                }
                <p>
                <br/>
                Create a new Account <Link to='/signup'>Sign Up </Link>
                </p>



            </form>
        </div>
    )
}

export default Login
