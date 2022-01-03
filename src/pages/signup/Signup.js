import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useGoogleAuth } from '../../hooks/useGoogleAuth'
import './Signup.css'
import { Link } from 'react-router-dom'

const Signup = () => {

    const { signup, error, isPending } = useSignup()
    const { signup: signupGoogle, error: errorGoogle, isPending: osPendingGoogle } = useGoogleAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setComfirmPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const [validate, setValidate] = useState(null)

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0];

        if (!selected) {
            setThumbnailError("Please, select a file.")
            return
        }
        if (!selected.type.includes('image')) {
            setThumbnailError("Selected file must be an image.")
            return
        }
        if (selected.size > 100000) {
            setThumbnailError("Image file size must be less than 100KB.")
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)
        console.log("thumbnail updated")

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (confirmPassword !== password) {
            setValidate("Password is not matching.")
            return
        } if (password.length <= 6) {
            setValidate("Choose a strong password.")
            return
        }
        if (!thumbnail) {
            setValidate("Please upload a valid thumbnail")
            return
        }
        else {
            setValidate(null)
            signup(email, password, displayName, thumbnail)
        }
    }

    const handleGoogleSignin = () => {
        signupGoogle()
    }
    return (
        <>
            <div className='google-button-container'>
            { errorGoogle && <div className='error'>{ errorGoogle }</div> }
                <div class="google-button" onClick={ handleGoogleSignin }>
                    <img alt="Google login" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                    {!osPendingGoogle ? <p>Sign up with Google</p> : <p>Signing in ...</p>}
                </div>
            </div>
            <hr />

           
            <form className='auth-form' onSubmit={ handleSubmit }>

                <h2>Sign up</h2>
                Already a user? <Link to='/login'>Login </Link>


                <label>
                    <span>Email</span>
                    <input type="email" required onChange={ (e) => setEmail(e.target.value) } value={ email } />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" required onChange={ (e) => setPassword(e.target.value) } value={ password } />
                </label>
                <label>
                    <span>Confirm Password</span>
                    <input type={ showPassword ? "password" : "text" } required onChange={ (e) => setComfirmPassword(e.target.value) } value={ confirmPassword } />
                    <span className="showpassword" onClick={ () => setShowPassword(!showPassword) }>{ showPassword ?
                        <img alt="show password" src="https://cdn3.iconfinder.com/data/icons/show-and-hide-password/100/show_hide_password-07-512.png"></img>
                        :
                        <img alt="hide password" src="https://cdn3.iconfinder.com/data/icons/show-and-hide-password/100/show_hide_password-10-512.png" /> }
                    </span>
                </label>

                <label>
                    <span>Username</span>
                    <input type="text"
                        required
                        onChange={ (e) => setDisplayName(e.target.value) }
                        value={ displayName }
                        title="Invalid Username. Do not use spaces in between."
                        pattern="^\S+$"
                    />
                </label>
                <label >
                    <span>Profile Thumbnail</span>
                    <input type="file" id="actual-btn" hidden
                        onChange={ handleFileChange }
                    />
                    <label className="file-choose-btn" htmlFor="actual-btn">Choose file</label>
                    { thumbnail && <div className='success-upload'>{ thumbnail.name }</div> }
                    { thumbnailError && <div className='error'>{ thumbnailError }</div> }
                </label>


                { validate && <div className='error'>{ validate }</div> }
                { error && <div className='error'>{ error }</div> }


                { isPending ? <div className='spinner-container'>
                    <div className="spinner"></div>
                </div> :
                    <button className="btn btn-large">Sign up</button>
                }
                



            </form>

            
        </>
    )
}

export default Signup

