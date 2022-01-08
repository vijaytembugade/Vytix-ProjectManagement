import React from 'react'
import Avatar from '../../component/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import "./Project.css"

const ProjectSummary = ({ project }) => {
    const { user } = useAuthContext()
    const { deleteDocument} = useFirestore('projects')
    const handleClick = (e) => {
        deleteDocument(project.id)
    }
    return (
        <div>
            <div className="project-summary">
                <h1 className="page-title">{ project.name } </h1>
                <p>created by { project.createdBy.displayName }</p>
                <p className="due-date">
                    Project due by  { project.dueDate.toDate().toDateString() }
                </p>
                <p className="details">
                    { project.details }
                </p>
                <h5>Project is assigned to :
                    <div className="assigned-users">
                        { project.assignedUsersList.map(user => (
                            <div key={ user.id } title={ user.displayName }>
                                <Avatar src={ user.photoURL }></Avatar>
                            </div>

                        )) }
                    </div>
                </h5>

            </div>
            { user.uid === project.createdBy.id && <button className="mark-as-done" onClick={ handleClick }>Mark as Complete</button> }
        </div>
    )
}

export default ProjectSummary
