import { useHistory, useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import './Project.css'
import ProjectComments from './ProjectComments'
import ProjectSummary from './ProjectSummary'


const Project = () => {
    const { id } = useParams()
    const history =useHistory()

    const { document, error } = useDocument('projects', id)

    if (error) {
        setTimeout(()=>{
            history.push('/')
        }, 2200)
        return <div className="error">{ error } , redirecting to dashboard. </div>
    }

    if (!document) {
        return <div className="loading">Loading..</div>
    }

    return (
        <div className="project-details">
            <ProjectSummary project={ document } />
            <ProjectComments project={document}/>

        </div>
    )
}

export default Project
