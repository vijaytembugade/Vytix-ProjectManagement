import './Dashboard.css'
import {useCollection} from '../../hooks/useCollection'
import ProjectList from '../../component/ProjectList'

const Dashboard = () => {
    const {documents , error} = useCollection('projects')
    console.log(documents)

    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error &&<div className="error">{error}</div>}
            {!documents && !error && <p className="loading">Loading...</p>}
            {documents && <ProjectList projects={documents}/>}
        </div>
    )
}

export default Dashboard
