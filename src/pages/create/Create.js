import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from "../../hooks/useCollection"
import {useAuthContext} from '../../hooks/useAuthContext'
import {useFirestore } from '../../hooks/useFirestore'


import { timestamp } from '../../firebase/config'
import './Create.css'
import { useHistory } from 'react-router-dom'

const categories = [
    { value: 'development', label: "Development" },
    { value: 'design', label: "Design" },
    { value: 'api-project', label: "Api-project" },
    { value: 'other', label: "other" },
]

function Create() {

    const {addDocument, response} = useFirestore('projects')

    const {documents } = useCollection('users');

    const history = useHistory()

    const { user }=useAuthContext()

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUser] = useState([])
    const [users, setUsers] = useState([])
    const [formError, setFormError] = useState(null)

    useEffect(()=>{
        if(documents){
            const options = documents.map(user =>{
                return {value: user, label: user.displayName}
            })

            setUsers(options)
        }
    }, [documents])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if(!category){
            setFormError("Please Select a project category!")
            return 
        }
        if(assignedUsers.length < 1){
            setFormError("Please , assign the project to atleast one user!")
            return 
        }
        if(dueDate < Date.now()){
            setFormError("Due Date cannot be less than today's date!")
            return 
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL : user.photoURL,
            id :user.uid
        }

        const assignedUsersList =assignedUsers.map((u)=>{
            return{
                displayName : u.value.displayName,
                photoURL : u.value.photoURL,
                id : u.value.id
            }

        })
        const project = {
            name,
            details, 
            category : category.value, 
            dueDate: timestamp.fromDate(new Date(dueDate)), 
            comment :[], 
            createdBy,
            assignedUsersList
        }

        await  addDocument(project)
        if(!response.error ){
            console.log(response)
            history.push('/')
        }
    }

    return (
        <div className="create-form">
            <h2 className="page-title">Create New Project</h2>
            <form onSubmit={ handleSubmit }>
                <label>
                    <span>Project name: </span>
                    <input required type="text" onChange={ e => setName(e.target.value) } value={ name } />
                </label>
                <label>
                    <span>Project details: </span>
                    <textarea required type="text" onChange={ e => setDetails(e.target.value) } value={ details } />
                </label>
                <label>
                    <span>Set due date: </span>
                    <input required type="date" min={new Date().toJSON().slice(0,10)} onChange={ e => setDueDate(e.target.value) } value={ dueDate } />
                </label>
                <label className='category-label'>
                    <span>Project category </span>
                    <Select
                        onChange={ (option) => setCategory(option) }
                        options={ categories }
                    />
                </label>
                <label>
                    <span> Assign to:</span>
                    <Select 
                        onChange={ (option) => setAssignedUser(option) }
                        options={users}
                        isMulti
                    />

                </label>

                {formError && <div className="error">{formError}</div>}
                <button className="btn">Add Project</button>
            </form>
        </div>
    )
}

export default Create
