import "./Profile.css"
import { useAuthContext } from '../../hooks/useAuthContext'

import { useForgotPassword } from '../../hooks/useForgetPassword'
import { useState } from "react"
import { useEffect } from "react"

const Profile = () => {
    const [linkStatus, setLinkStatus] = useState(false)
    const { user } = useAuthContext()

    const { forgotPassword, error } = useForgotPassword()
    console.log(user)

    function handleClick() {
        if (user) {
            forgotPassword(user.email)
            setLinkStatus(true)
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            if(!error){
                setLinkStatus(false)
            }
        }, 2000)
    }, [linkStatus, error])


    



    return (
        <>
            <h2 className="profile-title">User profile</h2>
            { error && <div className="error">{ error }</div> }
            { linkStatus && <div className="success">Link is sent on your registered email address!</div> }
            <div className="profile">
                { user && <div>
                    <label>
                        <span>Name: </span>
                        <strong>{ user.displayName }</strong>
                    </label>
                    <label>
                        <span>email: </span>
                        <strong>{ user.email }</strong>
                    </label>
                    <label>
                        <span>Change your password:</span>
                        <button onClick={ handleClick } className="btn">Get password reset link</button>
                    </label>
                </div> }
                { user && <div>
                    <img alt="profile pic" className="profile-image" src={ user.photoURL } />
                </div> }

            </div>
        </>
    )
}

export default Profile
