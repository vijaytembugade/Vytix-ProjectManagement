import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from "../../hooks/useCollection"
import './Create.css'

const categories = [
    { value: 'development', label: "Development" },
    { value: 'design', label: "Design" },
    { value: 'api-project', label: "Api-project" },
    { value: 'other', label: "other" },
]

function Create() {

    const {documents } = useCollection('users');

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

    const handleSubmit = (e) => {
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

        console.log(name, dueDate, details, category, assignedUsers)
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
