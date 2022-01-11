import { useState } from "react"
import { useForgotPassword } from '../../hooks/useForgetPassword'
import "./ForgotPassword.css"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const { forgotPassword, error } = useForgotPassword()
    const [linkStatus, setLinkStatus] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        forgotPassword(email)
        if (!error) {
            setLinkStatus(true)

        }
    }
    return (
        <>
        
            { error && <div className="error">{ error }</div> }
            { !error && linkStatus && <div className="success">Link sent sucessfully, please check your mail ! </div> }
            <form className="forgot-password-form" onSubmit={ handleSubmit }>
            <h2>Reset your password</h2>
                <label>
                    <span>Enter your email:</span>
                <input type="email" value={ email } onChange={ e => setEmail(e.target.value) } />
                </label>
                <button className="btn btn-large">Get Password Reset Link</button>
            </form>
        </>
    )
}

export default ForgotPassword
// vijaytembugade@protonmail.com
