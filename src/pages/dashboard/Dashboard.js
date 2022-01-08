import './Dashboard.css'
import {useCollection} from '../../hooks/useCollection'
import ProjectList from '../../component/ProjectList'
import ProjectFilter from './ProjectFilter'
import { useState } from "react"
import {useAuthContext} from '../../hooks/useAuthContext'

const Dashboard = () => {
    const {documents , error} = useCollection('projects')

    const {user}=useAuthContext();
    const [currentFilter, setCurrentFilter] =useState("all")

    const chnageFilter = (newFilter)=>{
        setCurrentFilter(newFilter)
    }

    const projects =documents ?(  documents.filter((document)=>{
        switch(currentFilter){
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach(u=>{
                    if(user.uid ===u.id){
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'development':
            case 'design':
            case 'api-project':
            case 'other':
                console.log(document.category, currentFilter)
                return document.category.toLowerCase() === currentFilter.toLowerCase()

            default:
                return true
        }
    })) : null

    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error &&<div className="error">{error}</div>}
            {!documents && !error && <p className="loading">Loading...</p>}
            {document && <ProjectFilter currentFilter={currentFilter} chnageFilter={chnageFilter}/>}
            {projects && <ProjectList projects={projects}/>}
        </div>
    )
}

export default Dashboard
