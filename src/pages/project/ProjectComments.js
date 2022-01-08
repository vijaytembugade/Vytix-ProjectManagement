import { useState } from 'react';
import Avatar from '../../component/Avatar';
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'





export default function ProjectComments({ project }) {

    const { updateDocument, response } = useFirestore('projects')
    const [newComment, setNewComment] = useState('')
    const { user } = useAuthContext()
    const [notAllowed, setNotAllowed] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        // project.assignedUsersList.map((u => {
        //     if (u.id === user.uid) {
        //         setCanComment(true)
        //     }
        // }))

        // console.log(project.createdBy.id)

        // if (project.createdBy.id === user.uid) {
        //     setCanComment(true)
        // }


        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }

        await updateDocument(project.id, {
            comment: [...project.comment, commentToAdd]
        })

        if (!response.error) {
            setNewComment('')
            setNotAllowed(false)

        } else {
            setNotAllowed(true)
            setNewComment('')
            console.log("You are not allowed to comment")
        }


    }
    return (
        <div className="project-comments">
            <h4>Project comments</h4>


            <ul>
                { project.comment.length > 0 && project.comment.map(c => {
                    return (
                        <li key={ c.id }>
                            <div title={ c.displayName } className="comment-author">
                                <Avatar src={ c.photoURL } />
                                <p>{ c.displayName }</p>
                            </div>
                            <div className='comment-date'>
                                <p>{formatDistanceToNow(c.createdAt.toDate(), { addSuffix : true })}</p>
                            </div>
                            <div className="comment-content">
                                { c.content }
                            </div>
                        </li>
                    )
                }) }
            </ul>
            <form className='add-comment' onSubmit={ handleSubmit }>
                { notAllowed && <div className="error">You are not allowed to comment, because you are not part of this project!</div> }
                <label>
                    <span>Add new Comment</span>
                    <textarea required onChange={ e => setNewComment(e.target.value) } value={ newComment }></textarea>
                </label>

                <button className="btn"> Add Comment</button>
            </form>



        </div>
    )
}
