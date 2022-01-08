import React from 'react'
import Avatar from '../../component/Avatar'
import "./Project.css"

const ProjectSummary = ({ project }) => {
    return (
        <div>
            <div className="project-summary">
                <h1 className="page-title">{project.name} </h1>
                    <p className="due-date">
                        Project due by  { project.dueDate.toDate().toDateString() }
                    </p>
                    <p className="details">
                        { project.details }
                    </p>
                    <h5>Project is assigned to :
                        <div className="assigned-users">
                        { project.assignedUsersList.map(user => (
                            <div  key={ user.id } title={user.displayName}>
                                <Avatar src={ user.photoURL }></Avatar>
                            </div>

                        )) }
                        </div>
                    </h5>
                
            </div>
        </div>
    )
}

export default ProjectSummary
